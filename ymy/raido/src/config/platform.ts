/**
 * Raido Platform Overview
 * 
 * Master list of all pages, components, features, and configurations
 */

export interface RaidoPlatform {
  // Pages/Routes
  pages: {
    landing: {
      path: '/';
      component: 'LandingPage';
      title: 'Raido — The Swift Provider';
      description: 'Welcome to the next degree.';
      features: string[];
    };
    scanner: {
      path: '/hunt';
      component: 'OpportunityScanner';
      title: 'Opportunity Hunter';
      description: 'Scan the Solana ecosystem for emerging liquid pairs';
      features: string[];
    };
    flows: {
      path: '/flow';
      component: 'FlowSimulator';
      title: 'Capital Flow Simulator';
      description: 'Design multi-step capital flows between assets';
      features: string[];
    };
    dashboard: {
      path: '/dashboard';
      component: 'Dashboard';
      title: 'Liquidity Dashboard';
      description: 'Real-time metrics and opportunities';
      features: string[];
    };
  };

  // Shared Components
  components: {
    // Core narratives
    RaidhoRune: { description: 'Animated wheel symbol representing motion' };
    ParticleBackground: { description: 'Canvas-based particle atmosphere' };
    LightBeam: { description: 'Cinematic light effects' };
    LoadingScreen: { description: 'Cinematic initialization sequence' };
    
    // Navigation  
    Header: { description: 'Sticky header with nav and wallet connect' };
    Footer: { description: 'Links, lore, and social' };
    MobileMenu: { description: 'Mobile navigation drawer' };
  };

  // Hooks
  hooks: {
    useParticles: { 
      purpose: 'Particle animation system';
      params: ['canvasRef', 'enabled'];
      methods: ['createParticle'];
    };
    useTypingEffect: {
      purpose: 'Character-by-character text reveal';
      params: ['text', 'speed', 'startDelay'];
      returns: { displayedText: string; isComplete: boolean };
    };
  };

  // Data Types
  types: {
    Opportunity: { fields: ['id', 'name', 'liquidityUSD', 'volume24h', 'apy', 'risk', 'assets'] };
    FlowPath: { fields: ['id', 'from', 'to', 'amount', 'route', 'expectedReturn', 'efficiency'] };
    SavedFlow: { fields: ['id', 'name', 'paths', 'status', 'createdAt', 'executedAt'] };
    DashboardMetrics: { fields: ['totalLiquidity', 'totalVolume24h', 'opportunitiesFound', 'activeFlows', 'averageAPY'] };
  };

  // Design System
  design: {
    colors: {
      primary: { value: '#d4af37'; name: 'Raido Gold'; usage: 'Primary elements, text, glows' };
      background: { value: '#0d0d1a'; name: 'Deep Black'; usage: 'Main background' };
      dark_blue: { value: '#0a1f3e'; name: 'Deep Blue'; usage: 'Secondary background' };
      cyan: { value: '#00ffff'; name: 'Cyan'; usage: 'Highlights and accents' };
    };
    
    typography: {
      display: 'Inter';
      monospace: 'JetBrains Mono';
      sizes: { sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem' };
    };

    spacing: {
      grid: 'Tailwind CSS grid system (4px base)';
      breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' };
    };

    animations: {
      typing_reveal: { duration: '3s', effect: 'Character-by-character reveal' };
      glow_pulse: { duration: '3s', effect: 'Pulsing shadow glow' };
      float: { duration: '6s', effect: 'Gentle vertical movement' };
      shimmer: { duration: '3s', effect: 'Background shine effect' };
      beam: { duration: '2s', effect: 'Horizontal light beam sweep' };
    };
  };

  // Mobile Responsiveness
  mobile: {
    strategy: 'Mobile-first design system';
    breakpoints: {
      mobile: '< 640px';
      tablet: '640px - 1024px';
      desktop: '> 1024px';
    };
    touches: {
      minimum_target: '44px';
      spacing: 'Gap utilities (gap-2 to gap-12)';
      text_scaling: 'Responsive font sizes (text-sm to text-3xl)';
    };
  };

  // Feature Matrix
  features: {
    opportunity_scanner: {
      enabled: true;
      mock_data: true;
      api_ready: true;
      realtime: false;
    };
    flow_simulator: {
      enabled: true;
      mock_data: true;
      save_flows: true;
      execution: false;
    };
    dashboard: {
      enabled: true;
      mock_data: true;
      realtime: false;
      tide_pool: 'mocked';
    };
    wallet_integration: {
      enabled: true;
      connected_state: 'simulated';
      execution: false;
    };
  };

  // Environment
  environment: {
    dev: { port: 3000; target: 'localhost' };
    prod: { target: 'production'; optimization: 'enabled' };
    config: ['.env.local', '.env.example'];
  };
}

// Feature flags
export const FEATURES = {
  MOCK_DATA: true,
  WALLET_ADAPTER_ENABLED: true,
  ANIMATIONS_ENABLED: true,
  PARTICLE_EFFECTS: true,
  DEVNET_MODE: true,
} as const;

// Brand Guidelines
export const BRAND = {
  name: 'Raido',
  tagline: 'The Swift Provider',
  subtitle: 'Son of Sophia',
  narrative: 'Where the Daughters birth assets into matter, Raido provides the masculine current of movement.',
  principles: ['Sovereign', 'Swift', 'Flowing', 'Opportunistic', 'Esoteric'],
} as const;

// Performance Targets
export const PERFORMANCE = {
  landing_page_load: '< 2s',
  scanner_search: '< 1s',
  flow_simulation: '< 500ms',
  dashboard_update: 'real-time',
  particles: 'configurable_intensity',
} as const;
