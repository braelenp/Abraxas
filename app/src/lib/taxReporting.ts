import { jsPDF } from 'jspdf';
import type { AgentActionLog, LaCasaDepositRecord, SophiaAgent, SophiaTradeRecord, VaultAssetType, VaultSummary } from './types';

export const ACTIVE_TAX_YEAR = 2026;

type TaxReportInput = {
  vault: VaultSummary;
  deposits: LaCasaDepositRecord[];
  logs: AgentActionLog[];
  tradeRecords: SophiaTradeRecord[];
  agents: SophiaAgent[];
  year?: number;
};

type CostBasisRow = {
  assetLabel: string;
  collection: string;
  acquiredOn: string;
  costBasis: number;
  currentValueEstimate: number;
  gainLossEstimate: number;
};

type AbraxHistoryRow = {
  date: string;
  event: string;
  amount: number;
  source: 'actual' | 'estimated';
  notes: string;
};

type DepreciationRow = {
  assetLabel: string;
  scheduleLabel: string;
  annualDepreciation: number;
  yearToDateDepreciation: number;
  remainingBasis: number;
  notes: string;
};

export type VaultTaxReport = {
  vaultId: string;
  vaultName: string;
  year: number;
  estimatedRealizedGainLoss: number;
  estimatedUnrealizedGainLoss: number;
  totalCostBasis: number;
  costBasisRows: CostBasisRow[];
  abraxHistoryRows: AbraxHistoryRow[];
  depreciationRows: DepreciationRow[];
  notes: string[];
};

type PortfolioTaxSummary = {
  year: number;
  estimatedCapitalGainsYtd: number;
  estimatedUnrealizedGainLoss: number;
  totalCostBasis: number;
  reportCount: number;
};

const realizationRatios: Record<VaultAssetType, number> = {
  dapp_equity: 0.38,
  real_estate: 0.16,
  trading_portfolio: 0.62,
  music_rights: 0.24,
  ip_licensing: 0.28,
};

const abraxMintRatios: Record<VaultAssetType, number> = {
  dapp_equity: 0.18,
  real_estate: 0.42,
  trading_portfolio: 0.24,
  music_rights: 0.3,
  ip_licensing: 0.3,
};

const depreciationRules: Partial<Record<VaultAssetType, { years: number; label: string }>> = {
  real_estate: { years: 27.5, label: 'Residential straight-line' },
  music_rights: { years: 15, label: 'Media rights amortization' },
  ip_licensing: { years: 15, label: 'IP amortization' },
};

function formatDate(input: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(input));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function roundToTwo(value: number) {
  return Math.round(value * 100) / 100;
}

function getGrowthMultiplier(vault: VaultSummary) {
  return vault.depositedAmount > 0 ? vault.vaultValue / vault.depositedAmount : 1;
}

function extractNumericAmount(value?: string) {
  if (!value) {
    return 0;
  }

  const match = value.match(/([\d,]+(?:\.\d+)?)/);
  return match ? Number.parseFloat(match[1].replaceAll(',', '')) : 0;
}

function buildCostBasisRows(vault: VaultSummary, deposits: LaCasaDepositRecord[]) {
  const growthMultiplier = getGrowthMultiplier(vault);

  return deposits.map((deposit) => {
    const currentValueEstimate = roundToTwo(deposit.stablecoinAmount * growthMultiplier);
    return {
      assetLabel: deposit.label,
      collection: deposit.collection,
      acquiredOn: formatDate(deposit.depositedAt),
      costBasis: deposit.stablecoinAmount,
      currentValueEstimate,
      gainLossEstimate: roundToTwo(currentValueEstimate - deposit.stablecoinAmount),
    };
  });
}

function buildAbraxHistoryRows(vault: VaultSummary, deposits: LaCasaDepositRecord[], logs: AgentActionLog[], year: number) {
  const actualRows = logs
    .filter((log) => log.vaultId === vault.id)
    .filter((log) => new Date(log.timestamp).getFullYear() === year)
    .filter((log) => /ABRA|ABRAX|mint|redeem|redemption|spent|withdraw/i.test(`${log.action} ${log.detail ?? ''}`))
    .map((log) => ({
      date: formatDate(log.timestamp),
      event: log.action,
      amount: extractNumericAmount(log.detail ?? log.action),
      source: 'actual' as const,
      notes: log.detail ?? 'Recorded protocol activity.',
    }));

  if (actualRows.length > 0) {
    return actualRows;
  }

  const mintRatio = abraxMintRatios[vault.assetType];
  const estimatedRows = deposits.flatMap((deposit, index) => {
    const mintedAmount = roundToTwo(deposit.stablecoinAmount * mintRatio);
    const rows: AbraxHistoryRow[] = [
      {
        date: formatDate(deposit.depositedAt),
        event: 'Estimated ABRAX mint against posted collateral',
        amount: mintedAmount,
        source: 'estimated',
        notes: `Derived from ${Math.round(mintRatio * 100)}% collateralization guidance for ${vault.assetType.replaceAll('_', ' ')} assets.`,
      },
    ];

    if (vault.circuitState !== 'normal' || index === deposits.length - 1) {
      rows.push({
        date: formatDate(new Date(Date.parse(deposit.depositedAt) + 45 * 24 * 60 * 60 * 1000).toISOString()),
        event: 'Estimated ABRAX redemption / debt reduction',
        amount: roundToTwo(mintedAmount * (vault.circuitState === 'warning' ? 0.15 : 0.08)),
        source: 'estimated',
        notes: vault.circuitState === 'warning'
          ? 'Warning-state vaults reserve a larger redemption buffer.'
          : 'Routine partial debt reduction estimate based on vault maintenance.',
      });
    }

    return rows;
  });

  return estimatedRows;
}

function buildDepreciationRows(vault: VaultSummary, deposits: LaCasaDepositRecord[]) {
  const rule = depreciationRules[vault.assetType];

  if (!rule) {
    return deposits.map((deposit) => ({
      assetLabel: deposit.label,
      scheduleLabel: 'Not depreciated',
      annualDepreciation: 0,
      yearToDateDepreciation: 0,
      remainingBasis: deposit.stablecoinAmount,
      notes: 'This asset class is treated as mark-to-market under the current estimate model.',
    }));
  }

  const currentYear = ACTIVE_TAX_YEAR;

  return deposits.map((deposit) => {
    const acquiredDate = new Date(deposit.depositedAt);
    const yearsElapsed = Math.max(0, currentYear - acquiredDate.getFullYear());
    const annualDepreciation = roundToTwo(deposit.stablecoinAmount / rule.years);
    const accumulatedDepreciation = Math.min(deposit.stablecoinAmount, annualDepreciation * yearsElapsed);
    const yearToDateDepreciation = roundToTwo(annualDepreciation);
    const remainingBasis = roundToTwo(Math.max(deposit.stablecoinAmount - accumulatedDepreciation - yearToDateDepreciation, 0));

    return {
      assetLabel: deposit.label,
      scheduleLabel: `${rule.label} (${rule.years} yrs)`,
      annualDepreciation,
      yearToDateDepreciation,
      remainingBasis,
      notes: 'Straight-line estimate for planning only. Final treatment depends on legal structure and placed-in-service date.',
    };
  });
}

export function buildVaultTaxReport({ vault, deposits, logs, tradeRecords, agents, year = ACTIVE_TAX_YEAR }: TaxReportInput): VaultTaxReport {
  const relevantDeposits = deposits.filter((deposit) => deposit.vaultId === vault.id);
  const assignedAgentIds = agents
    .filter((agent) => agent.assignedToVaults.includes(vault.id) || agent.name === vault.assignedAgent)
    .map((agent) => agent.id);

  const relevantTrades = tradeRecords.filter((record) => {
    const recordYear = new Date(record.timestamp).getFullYear();
    return assignedAgentIds.includes(record.sophiaAgentId) && recordYear === year && record.status === 'executed';
  });

  const costBasisRows = buildCostBasisRows(vault, relevantDeposits);
  const abraxHistoryRows = buildAbraxHistoryRows(vault, relevantDeposits, logs, year);
  const depreciationRows = buildDepreciationRows(vault, relevantDeposits);

  const totalCostBasis = roundToTwo(costBasisRows.reduce((sum, row) => sum + row.costBasis, 0));
  const totalGainLoss = roundToTwo(vault.vaultValue - vault.depositedAmount);
  const realizedFromTrades = roundToTwo(relevantTrades.reduce((sum, trade) => sum + (trade.pnl ?? 0), 0));
  const estimatedRealizedFromCarry = roundToTwo(totalGainLoss * realizationRatios[vault.assetType]);
  const estimatedRealizedGainLoss = realizedFromTrades !== 0 ? roundToTwo(realizedFromTrades + estimatedRealizedFromCarry) : estimatedRealizedFromCarry;
  const estimatedUnrealizedGainLoss = roundToTwo(totalGainLoss - estimatedRealizedGainLoss);

  return {
    vaultId: vault.id,
    vaultName: vault.name,
    year,
    estimatedRealizedGainLoss,
    estimatedUnrealizedGainLoss,
    totalCostBasis,
    costBasisRows,
    abraxHistoryRows,
    depreciationRows,
    notes: [
      'This report is an estimated planning export generated from vault balances, La Casa deposit records, assigned-agent activity, and protocol log data.',
      'Realized gain/loss figures use recorded trade PnL where available and an asset-class realization model where direct closing data is not present.',
      'ABRAX minting and redemption rows are marked estimated whenever the protocol does not yet have explicit tax-lot debt history on-chain or in-app.',
    ],
  };
}

export function buildPortfolioTaxSummary(input: {
  vaults: VaultSummary[];
  deposits: LaCasaDepositRecord[];
  logs: AgentActionLog[];
  tradeRecords: SophiaTradeRecord[];
  agents: SophiaAgent[];
  year?: number;
}): PortfolioTaxSummary {
  const reports = input.vaults.map((vault) => buildVaultTaxReport({
    vault,
    deposits: input.deposits,
    logs: input.logs,
    tradeRecords: input.tradeRecords,
    agents: input.agents,
    year: input.year,
  }));

  return {
    year: input.year ?? ACTIVE_TAX_YEAR,
    estimatedCapitalGainsYtd: roundToTwo(reports.reduce((sum, report) => sum + report.estimatedRealizedGainLoss, 0)),
    estimatedUnrealizedGainLoss: roundToTwo(reports.reduce((sum, report) => sum + report.estimatedUnrealizedGainLoss, 0)),
    totalCostBasis: roundToTwo(reports.reduce((sum, report) => sum + report.totalCostBasis, 0)),
    reportCount: reports.length,
  };
}

function downloadBlob(content: BlobPart, fileName: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function csvEscape(value: string | number) {
  const stringValue = String(value);
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }
  return stringValue;
}

export function downloadVaultTaxReportCsv(report: VaultTaxReport) {
  const rows: string[] = [];
  rows.push(`Vault Tax Report,${csvEscape(report.vaultName)}`);
  rows.push(`Tax Year,${report.year}`);
  rows.push(`Estimated Realized Gain/Loss,${report.estimatedRealizedGainLoss}`);
  rows.push(`Estimated Unrealized Gain/Loss,${report.estimatedUnrealizedGainLoss}`);
  rows.push(`Total Cost Basis,${report.totalCostBasis}`);
  rows.push('');
  rows.push('Cost Basis Per La Casa NFT');
  rows.push('Asset,Collection,Acquired On,Cost Basis,Current Value Estimate,Gain/Loss Estimate');
  report.costBasisRows.forEach((row) => {
    rows.push([
      row.assetLabel,
      row.collection,
      row.acquiredOn,
      row.costBasis,
      row.currentValueEstimate,
      row.gainLossEstimate,
    ].map(csvEscape).join(','));
  });
  rows.push('');
  rows.push('ABRAX Minting / Redemption History');
  rows.push('Date,Event,Amount,Source,Notes');
  report.abraxHistoryRows.forEach((row) => {
    rows.push([
      row.date,
      row.event,
      row.amount,
      row.source,
      row.notes,
    ].map(csvEscape).join(','));
  });
  rows.push('');
  rows.push('Depreciation Schedule For Physical Assets');
  rows.push('Asset,Schedule,Annual Depreciation,YTD Depreciation,Remaining Basis,Notes');
  report.depreciationRows.forEach((row) => {
    rows.push([
      row.assetLabel,
      row.scheduleLabel,
      row.annualDepreciation,
      row.yearToDateDepreciation,
      row.remainingBasis,
      row.notes,
    ].map(csvEscape).join(','));
  });
  rows.push('');
  rows.push('Notes');
  report.notes.forEach((note) => rows.push(csvEscape(note)));

  downloadBlob(rows.join('\n'), `${report.vaultName.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}-${report.year}-tax-report.csv`, 'text/csv;charset=utf-8');
}

function renderPdfSection(pdf: jsPDF, title: string, lines: string[], startY: number) {
  let y = startY;
  const pageHeight = pdf.internal.pageSize.getHeight();
  if (y > pageHeight - 80) {
    pdf.addPage();
    y = 48;
  }

  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(34, 211, 238);
  pdf.text(title, 40, y);
  y += 18;

  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(226, 232, 240);
  lines.forEach((line) => {
    const wrapped = pdf.splitTextToSize(line, 520);
    if (y + wrapped.length * 12 > pageHeight - 40) {
      pdf.addPage();
      y = 48;
    }
    pdf.text(wrapped, 40, y);
    y += wrapped.length * 12 + 6;
  });

  return y + 6;
}

export function downloadVaultTaxReportPdf(report: VaultTaxReport) {
  const pdf = new jsPDF({ unit: 'pt', format: 'letter' });
  pdf.setFillColor(7, 13, 28);
  pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(20);
  pdf.text(`${report.vaultName} Tax Report`, 40, 46);
  pdf.setFontSize(11);
  pdf.setTextColor(148, 163, 184);
  pdf.text(`Tax year ${report.year} • Estimated planning report`, 40, 64);

  let y = 92;
  y = renderPdfSection(pdf, 'Summary', [
    `Estimated realized gains/losses for the year: ${formatCurrency(report.estimatedRealizedGainLoss)}`,
    `Estimated unrealized gains/losses: ${formatCurrency(report.estimatedUnrealizedGainLoss)}`,
    `Total La Casa cost basis tracked in this vault: ${formatCurrency(report.totalCostBasis)}`,
  ], y);

  y = renderPdfSection(pdf, 'Cost Basis Per La Casa NFT', report.costBasisRows.map((row) => (
    `${row.assetLabel} • ${row.collection} • acquired ${row.acquiredOn} • basis ${formatCurrency(row.costBasis)} • current est. ${formatCurrency(row.currentValueEstimate)} • gain/loss est. ${formatCurrency(row.gainLossEstimate)}`
  )), y);

  y = renderPdfSection(pdf, 'ABRAX Minting / Redemption History', report.abraxHistoryRows.map((row) => (
    `${row.date} • ${row.event} • ${formatCurrency(row.amount)} • ${row.source.toUpperCase()} • ${row.notes}`
  )), y);

  y = renderPdfSection(pdf, 'Depreciation Schedule For Physical Assets', report.depreciationRows.map((row) => (
    `${row.assetLabel} • ${row.scheduleLabel} • annual ${formatCurrency(row.annualDepreciation)} • YTD ${formatCurrency(row.yearToDateDepreciation)} • remaining basis ${formatCurrency(row.remainingBasis)} • ${row.notes}`
  )), y);

  renderPdfSection(pdf, 'Compliance Notes', report.notes, y);
  pdf.save(`${report.vaultName.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}-${report.year}-tax-report.pdf`);
}