/**
 * Diagnostic tools for Jupiter API troubleshooting
 */

const JUPITER_API_BASE = 'https://quote-api.jup.ag/v6';

/**
 * Test basic Jupiter API connectivity
 */
export async function testJupiterConnectivity(): Promise<{
  connected: boolean;
  message: string;
  statusCode?: number;
}> {
  try {
    console.log('[Diagnostic] Testing Jupiter API connectivity...');
    
    // Test with simple well-known tokens
    const testUrl = `${JUPITER_API_BASE}/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWaLb3odccccccccccccccccccccccccccPwr2ugEp&amount=1000000&slippageBps=50`;
    
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Abraxas/1.0',
      },
    });

    console.log(`[Diagnostic] Jupiter health check: ${response.status} ${response.statusText}`);

    if (response.ok) {
      return {
        connected: true,
        message: '✓ Jupiter API is reachable and responding',
        statusCode: response.status,
      };
    } else {
      const errorText = await response.text();
      return {
        connected: false,
        message: `✗ Jupiter API returned error: ${response.status} ${response.statusText}`,
        statusCode: response.status,
      };
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[Diagnostic] Jupiter connectivity test failed:', errorMsg);
    
    return {
      connected: false,
      message: `✗ Cannot reach Jupiter API: ${errorMsg}`,
    };
  }
}

/**
 * Test if specific token pair can be routed
 */
export async function testTokenPair(
  inputMint: string,
  outputMint: string,
  amount: number = 1000000
): Promise<{
  routeable: boolean;
  message: string;
  hasLiquidity?: boolean;
}> {
  try {
    console.log(`[Diagnostic] Testing route: ${inputMint} -> ${outputMint}`);
    
    const url = new URL(`${JUPITER_API_BASE}/quote`);
    url.searchParams.append('inputMint', inputMint);
    url.searchParams.append('outputMint', outputMint);
    url.searchParams.append('amount', amount.toString());
    url.searchParams.append('slippageBps', '50');
    
    console.log('[Diagnostic] Query URL:', url.toString());

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Abraxas/1.0',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Diagnostic] API Error ${response.status}:`, errorText);
      
      try {
        const errorJson = JSON.parse(errorText);
        return {
          routeable: false,
          message: `✗ No route available: ${errorJson.error || response.statusText}`,
        };
      } catch {
        return {
          routeable: false,
          message: `✗ API Error ${response.status}: ${response.statusText}`,
        };
      }
    }

    const data = await response.json();
    
    if ((data as any).outAmount) {
      return {
        routeable: true,
        hasLiquidity: !(data as any).marketInfos?.every((m: any) => m.notEnoughLiquidity),
        message: `✓ Route found! Output: ${(data as any).outAmount} (price impact: ${(data as any).priceImpactPct}%)`,
      };
    } else {
      return {
        routeable: false,
        message: '✗ Route returned but no output amount',
      };
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return {
      routeable: false,
      message: `✗ Error testing route: ${errorMsg}`,
    };
  }
}

/**
 * Run full diagnostic suite
 */
export async function runFullDiagnostic(
  abraTokenAddress: string = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS'
): Promise<string> {
  console.log('[Diagnostic] ===== JUPITER DIAGNOSTIC SUITE =====');
  
  const results: string[] = [];
  
  // Test 1: Connectivity
  const connectivity = await testJupiterConnectivity();
  results.push(`\n1. API Connectivity: ${connectivity.message}`);
  
  if (!connectivity.connected) {
    results.push('\n⚠️  Cannot proceed with further tests - API unreachable');
    const finalReport = results.join('\n');
    console.log(finalReport);
    return finalReport;
  }

  // Test 2: Well-known route (SOL -> USDC)
  const knownRoute = await testTokenPair(
    'So11111111111111111111111111111111111111112',
    'EPjFWaLb3odccccccccccccccccccccccccccPwr2ugEp'
  );
  results.push(`\n2. SOL -> USDC route: ${knownRoute.message}`);

  // Test 3: Target route (SOL -> ABRA)
  const abraRoute = await testTokenPair(
    'So11111111111111111111111111111111111111112',
    abraTokenAddress
  );
  results.push(`\n3. SOL -> ABRA route: ${abraRoute.message}`);

  const finalReport = results.join('\n');
  console.log(finalReport);
  return finalReport;
}
