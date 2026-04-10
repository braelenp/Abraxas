# Multi-Language Implementation Checklist

## Core Setup ✅ COMPLETE
- [x] i18n configuration (`src/lib/i18n.ts`)
- [x] All 7 language JSON files created
- [x] LanguageSwitcher component created
- [x] I18nextProvider added to main.tsx
- [x] App.tsx updated with translations
- [x] ProfilePage fully translated
- [x] Responsive CSS for longer languages added
- [x] Implementation guide created

---

## Pages & Components to Update

### High Priority (User-Facing, Frequently Visited)

- [ ] **LandingPage** (`src/pages/LandingPage.tsx`)
  - [ ] Header/nav translations
  - [ ] Hero section (`landing.title`, `landing.subtitle`)
  - [ ] Feature descriptions
  - [ ] CTA buttons
  - [ ] Footer links
  - [ ] Difficulty: Easy | Est. Time: 30 min

- [ ] **DashboardPage** (`src/pages/DashboardPage.tsx`)
  - [ ] Widget titles
  - [ ] Button labels
  - [ ] Status messages
  - [ ] Difficulty: Medium | Est. Time: 45 min

- [ ] **MarketPage** (`src/pages/MarketPage.tsx`)
  - [ ] Table headers
  - [ ] Filter labels
  - [ ] Button actions
  - [ ] Difficulty: Medium | Est. Time: 40 min

### Medium Priority (Core Features)

- [ ] **ForgePage** (`src/pages/ForgePage.tsx`)
  - [ ] Section titles
  - [ ] Form labels
  - [ ] Submit buttons
  - [ ] Help text
  - [ ] Difficulty: Medium | Est. Time: 45 min

- [ ] **VaultsPage** (`src/pages/VaultsPage.tsx`)
  - [ ] Vault names/descriptions
  - [ ] APY labels
  - [ ] Action buttons
  - [ ] Difficulty: Easy | Est. Time: 30 min

- [ ] **TradePage** (`src/pages/TradePage.tsx`)
  - [ ] Trading interface labels
  - [ ] Order types
  - [ ] Confirmation dialogs
  - [ ] Difficulty: Medium | Est. Time: 45 min

- [ ] **CadabraPage** (`src/pages/CadabraPage.tsx`)
  - [ ] Section headers
  - [ ] Card descriptions
  - [ ] Action prompts
  - [ ] Difficulty: Easy | Est. Time: 35 min

### Lower Priority (Secondary Features)

- [ ] **OrionPage** (`src/pages/OrionPage.tsx`)
  - [ ] Chat prompts
  - [ ] Assistant responses structure
  - [ ] Control labels
  - [ ] Difficulty: Hard | Est. Time: 60 min

- [ ] **CircuitPage** (`src/pages/CircuitPage.tsx`)
  - [ ] Circuit elements
  - [ ] Status indicators
  - [ ] Configuration labels
  - [ ] Difficulty: Medium | Est. Time: 45 min

- [ ] **SophiaMintPage** (`src/pages/SophiaMintPage.tsx`)
  - [ ] Mint descriptions
  - [ ] Progress labels
  - [ ] Status messages
  - [ ] Difficulty: Easy | Est. Time: 30 min

- [ ] **StakePage** (`src/pages/StakePage.tsx`)
  - [ ] Staking info
  - [ ] Input labels
  - [ ] Confirmation text
  - [ ] Difficulty: Easy | Est. Time: 30 min

- [ ] **DepositPage** (`src/pages/DepositPage.tsx`)
  - [ ] Deposit instructions
  - [ ] Form labels
  - [ ] Confirmation text
  - [ ] Difficulty: Easy | Est. Time: 30 min

### Optional (Landing/Onboarding)

- [ ] **CampaignLandingPage** (`src/pages/CampaignLandingPage.tsx`)
  - [ ] Campaign details
  - [ ] CTA buttons
  - [ ] Difficulty: Easy | Est. Time: 30 min

- [ ] **TokenGatedPage** (`src/pages/TokenGatedPage.tsx`)
  - [ ] Gate message
  - [ ] Requirements text
  - [ ] Action buttons
  - [ ] Difficulty: Easy | Est. Time: 20 min

- [ ] **LoadingPage** (`src/pages/LoadingPage.tsx`)
  - [ ] Loading message
  - [ ] Difficulty: Trivial | Est. Time: 5 min

- [ ] **AcademyLedgerPage** (`src/pages/AcademyLedgerPage.tsx`)
  - [ ] Table headers
  - [ ] Filter options
  - [ ] Difficulty: Easy | Est. Time: 30 min

---

## Components to Update

### High Priority (Reusable, Widely Used)

- [ ] **BrandLogo** (`src/components/BrandLogo.tsx`)
  - [ ] Alt text
  - [ ] Aria labels
  - [ ] Difficulty: Trivial | Est. Time: 5 min

- [ ] **HackathonBanner** (`src/components/HackathonBanner.tsx`)
  - [ ] Banner message
  - [ ] Banner text
  - [ ] Difficulty: Easy | Est. Time: 10 min

- [ ] **OrionAssistant** (`src/components/OrionAssistant.tsx`)
  - [ ] Prompt examples
  - [ ] Response headers
  - [ ] UI labels
  - [ ] Difficulty: Hard | Est. Time: 60 min

- [ ] **WalletLoginModal** (`src/components/WalletLoginModal.tsx`)
  - [ ] Instructions
  - [ ] Button labels
  - [ ] Error messages
  - [ ] Difficulty: Easy | Est. Time: 20 min

### Medium Priority (Feature-Specific)

- [ ] **AbraxasIDCard** (`src/components/AbraxasIDCard.tsx`)
  - [ ] Card labels
  - [ ] Share button text
  - [ ] Difficulty: Easy | Est. Time: 15 min

- [ ] **JupiterSwapPanel** (`src/components/JupiterSwapPanel.tsx`)
  - [ ] Swap labels
  - [ ] Token names (keep data)
  - [ ] Action buttons
  - [ ] Difficulty: Easy | Est. Time: 20 min

- [ ] **ProfileCreationModal** (`src/components/ProfileCreationModal.tsx`)
  - [ ] Form labels
  - [ ] Instructions
  - [ ] Validation messages
  - [ ] Difficulty: Medium | Est. Time: 35 min

- [ ] **AirdropPointsWidget** (`src/components/AirdropPointsWidget.tsx`)
  - [ ] Point labels
  - [ ] Progress indicators
  - [ ] Difficulty: Easy | Est. Time: 15 min

- [ ] **ReferralLeaderboard** (`src/components/ReferralLeaderboard.tsx`)
  - [ ] Column headers
  - [ ] Rank labels
  - [ ] Difficulty: Easy | Est. Time: 15 min

- [ ] **DayTradingJournal** (`src/components/DayTradingJournal.tsx`)
  - [ ] Column headers
  - [ ] Entry labels
  - [ ] Difficulty: Easy | Est. Time: 20 min

- [ ] **RaidoTradingDashboard** (`src/components/RaidoTradingDashboard.tsx`)
  - [ ] Chart labels
  - [ ] Button labels
  - [ ] Status indicators
  - [ ] Difficulty: Medium | Est. Time: 40 min

### Lower Priority (Specialized)

- [ ] **MMarketFoundation** (`src/components/FoundationMarket.tsx`)
  - [ ] Market labels
  - [ ] Filter names
  - [ ] Difficulty: Easy | Est. Time: 25 min

- [ ] **OracleInsights** (`src/components/OracleInsights.tsx`)
  - [ ] Insight titles
  - [ ] Numeric labels (keep data)
  - [ ] Difficulty: Easy | Est. Time: 20 min

- [ ] **TikTokFeeSharing** (`src/components/TikTokFeeSharing.tsx`)
  - [ ] Information text
  - [ ] Button text
  - [ ] Difficulty: Easy | Est. Time: 15 min

- [ ] **UndercollateralizedLendingModule** (`src/components/UndercollateralizedLendingModule.tsx`)
  - [ ] Param labels
  - [ ] Info text
  - [ ] Difficulty: Medium | Est. Time: 35 min

- [ ] **M1PulldownModule** (`src/components/M1PulldownModule.tsx`)
  - [ ] Instructions
  - [ ] Status messages
  - [ ] Difficulty: Medium | Est. Time: 40 min

---

## Translation Keys to Add

### Create New Sections in Translation JSONs

- [ ] `dashboard` - Dashboard page labels
- [ ] `forge` - Forge/Mint page labels
- [ ] `trading` - Trading page specific labels (beyond common)
- [ ] `market` - Market page specific labels
- [ ] `leaderboard` - Leaderboard column headers
- [ ] `modals` - Expand modal-specific content
- [ ] `orion` - King AI specific labels
- [ ] `circuit` - Circuit breaker labels
- [ ] `academy` - Academy/education content
- [ ] `mint` - Minting/Sophia content
- [ ] `stake` - Staking specific labels
- [ ] `deposit` - Deposit process labels
- [ ] `whitepaper` - Whitepaper content
- [ ] `roadmap` - Roadmap content
- [ ] `lore` - Lore/story content
- [ ] `foundation` - Foundation market labels
- [ ] `raidoTrading` - Raido trading specific

---

## Estimated Totals

| Category | Count | Avg Time | Total |
|----------|-------|----------|-------|
| Pages (High Priority) | 2 | 30 min | 1 hour |
| Pages (Medium Priority) | 5 | 45 min | 3.75 hours |
| Pages (Low Priority) | 4 | 40 min | 2.75 hours |
| Components (High Priority) | 5 | 15 min | 1.25 hours |
| Components (Medium Priority) | 6 | 25 min | 2.5 hours |
| Components (Low Priority) | 8 | 20 min | 2.75 hours |
| **TOTAL** | **30** | | **~14 hours** |

**Note**: These are estimates. Simple pages like Loading/TokenGated are trivial. Complex pages like Orion may take longer.

---

## Implementation Workflow

### For Each Page/Component:

1. **Add Imports**
   ```tsx
   import { useTranslation } from 'react-i18next';
   ```

2. **Initialize Hook**
   ```tsx
   const { t } = useTranslation();
   ```

3. **Find All Text**
   - Search for hardcoded strings
   - Identify unique UI text
   - Note any dynamic content

4. **Create Translation Keys**
   - Add section to translation JSON if needed
   - Add keys for all text
   - Add to all 7 language files

5. **Replace Text**
   ```tsx
   // Before: <h1>Welcome</h1>
   // After: <h1>{t('section.welcome')}</h1>
   ```

6. **Test**
   - Switch languages
   - Verify text changes
   - Check responsive sizing (especially de, ar)
   - Ensure no layout breaks

7. **Commit**
   - One file per commit is ideal
   - Or batch related components

---

## Priority Execution Order

### Phase 1: Complete Core Experience (Week 1)
1. LandingPage → Most visible
2. DashboardPage → Most used
3. ProfilePage → ✅ Already done
4. MarketPage → Core feature

### Phase 2: Feature Pages (Week 2)
5. ForgePage
6. VaultsPage
7. TradePage
8. CadabraPage

### Phase 3: Secondary Features (Week 2-3)
9. OrionPage (complex)
10. CircuitPage
11. Supporting components

### Phase 4: Edge Cases & Polish (Week 3)
12. Remaining pages
13. Modals & dialogs
14. Error boundaries
15. Notifications

---

## Progress Tracking

Use this format to track progress:

```
COMPLETED:
- [x] i18n setup
- [x] LanguageSwitcher
- [x] App.tsx
- [x] ProfilePage

IN PROGRESS:
- [ ] LandingPage

TODO:
- [ ] DashboardPage
- [ ] MarketPage
... (rest of list)
```

---

## Tips & Tricks

1. **Use find/replace** to convert hardcoded strings quickly
2. **Copy-paste from translations** to get correct key names
3. **Test German first** - if layout breaks, it will show issues
4. **Batch similar pages** together for efficiency
5. **Create translation keys first**, then implement
6. **Use browser DevTools** to test different languages
7. **Group related translations** in JSON (easier to find)
8. **Document any strings that change dynamically** - harder to translate

---

## Validation Checklist Per Page

Before marking complete:
- [ ] All hardcoded text uses `t()` keys
- [ ] No translation keys are broken/undefined
- [ ] Works in all 7 languages
- [ ] No layout breaks on long translations (German)
- [ ] Buttons remain clickable and properly sized
- [ ] Modals display correctly
- [ ] Lists and tables align properly
- [ ] Error messages are readable
- [ ] No overflow or ellipsis cutting off important info

---

**Status**: Core implementation ✅ COMPLETE
**Next Action**: Start with LandingPage (highest impact)
