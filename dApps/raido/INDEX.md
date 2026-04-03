#!/usr/bin/env node

/**
 * Raido dApp - Project Index & Navigation Guide
 * 
 * Use this to understand the project structure, find files, and navigate development
 */

// ============================================================================
// 📋 QUICK FILE FINDER
// ============================================================================

const FILE_INDEX = {
  // Configuration
  'Project Setup': {
    'package.json': 'Dependencies and scripts',
    'vite.config.ts': 'Build configuration',
    'tsconfig.json': 'TypeScript configuration',
    'tailwind.config.js': 'Tailwind CSS theming',
    '.env.example': 'Environment template',
  },

  // Documentation
  'Documentation': {
    'README.md': '📖 Main overview and features',
    'QUICKSTART.md': '🚀 Get started in 5 minutes',
    'DEVELOPMENT.md': '💻 Development workflow',
    'MOBILE.md': '📱 Mobile responsive guide',
    'PROJECT_COMPLETE.md': '✅ Complete implementation summary',
    'this file': '📍 Project index and navigation',
  },

  // Source Code - Components
  'src/components': {
    'App.tsx': 'Main app shell, navigation, routing',
    'LandingPage.tsx': 'Hero page with Raidho rune and CTA',
    'LoadingScreen.tsx': 'Cinematic loading sequence',
    'OpportunityScanner.tsx': 'Liquidity discovery interface',
    'FlowSimulator.tsx': 'Capital flow builder',
    'Dashboard.tsx': 'Real-time metrics dashboard',
    'RaidhoRune.tsx': 'Animated rune SVG component',
    'ParticleBackground.tsx': 'Particle effects system',
    'LightBeam.tsx': 'Cinematic light beam effects',
  },

  // Source Code - Logic
  'src/hooks': {
    'useParticles.ts': 'Particle animation system',
    'useTypingEffect.ts': 'Character reveal typing effect',
  },

  'src/types': {
    'index.ts': 'TypeScript interfaces (Opportunity, FlowPath, etc.)',
  },

  'src/utils': {
    'mockData.ts': 'Mock data generators for development',
    'format.ts': 'Formatting utilities (USD, addresses, etc.)',
  },

  'src/config': {
    'platform.ts': 'Platform configuration and constants',
  },

  // Root Assets
  'Root Files': {
    'index.html': 'HTML entry point',
    'src/main.tsx': 'React app entry point',
    'src/App.tsx': 'Root React component',
    'src/index.css': 'Global styles and animations',
  },

  // Scripts
  'scripts': {
    'validate.js': 'Project validation script',
    'setup.sh': 'Unix setup automation',
    'setup.bat': 'Windows setup automation',
  },
};

// ============================================================================
// 🎯 FEATURE MATRIX - Find what you need
// ============================================================================

const FEATURES = {
  'Landing Page Effects': {
    files: ['src/components/LandingPage.tsx', 'src/components/RaidhoRune.tsx', 'src/components/ParticleBackground.tsx', 'src/components/LightBeam.tsx'],
    hooks: ['useTypingEffect'],
    styles: 'src/index.css - animations for typing, glow, float, shimmer, beam',
  },

  'Opportunity Discovery': {
    files: ['src/components/OpportunityScanner.tsx'],
    types: 'Opportunity, DashboardMetrics',
    utils: 'mockData.ts - generateMockOpportunities()',
    data_flow: 'Mock generation → useState → Display in cards',
  },

  'Flow Builder': {
    files: ['src/components/FlowSimulator.tsx'],
    types: 'FlowPath, SavedFlow',
    utils: 'mockData.ts - generateMockFlowPaths()',
    features: [
      'Multi-step path builder',
      'Route visualization',
      'Efficiency calculation',
      'Summary metrics',
      'Saved flows library',
    ],
  },

  'Dashboard Analytics': {
    files: ['src/components/Dashboard.tsx'],
    types: 'DashboardMetrics',
    utils: 'mockData.ts - generateDashboardMetrics(), generateRecentActivities()',
    displays: [
      'Key metrics cards',
      'Hot opportunities',
      'Recent activity feed',
      'Pool integration panel',
    ],
  },

  'Mobile Responsiveness': {
    guidelines: 'MOBILE.md - Complete responsive design guide',
    tailwind_utilities: 'sm:, md:, lg:, xl: prefixes',
    touch_targets: 'Minimum 44px with proper padding',
    breakpoints: 'sm: 640px, md: 768px, lg: 1024px, xl: 1280px',
  },

  'Dark Esoteric Aesthetic': {
    colors: 'tailwind.config.js - raido color scheme',
    animations: 'src/index.css - custom keyframes',
    effects: {
      particles: 'src/components/ParticleBackground.tsx',
      beams: 'src/components/LightBeam.tsx',
      glows: 'src/index.css - .rune-glow, .text-glow classes',
      rune: 'src/components/RaidhoRune.tsx - SVG symbol',
    },
  },
};

// ============================================================================
// 📂 COMPONENT DEPENDENCY MAP
// ============================================================================

const COMPONENT_GRAPH = {
  'App.tsx (Root)': {
    children: [
      'LandingPage',
      'OpportunityScanner',
      'FlowSimulator',
      'Dashboard',
      'Header (sticky)',
      'Footer',
      'MobileMenu',
    ],
    state: ['currentPage', 'mobileMenuOpen', 'walletConnected'],
  },

  'LandingPage': {
    children: ['RaidhoRune', 'ParticleBackground', 'LightBeam'],
    hooks: ['useTypingEffect'],
    effects: ['Light beams', 'Particles', 'Typing animations'],
  },

  'OpportunityScanner': {
    children: ['OpportunityCard[]'],
    state: ['opportunities', 'loading', 'searchPrompt'],
    utils: ['generateMockOpportunities()'],
  },

  'FlowSimulator': {
    children: ['PathBuilder[]', 'SummaryPanel'],
    state: ['paths', 'flowName', 'savedFlows'],
    utils: ['generateMockFlowPaths()'],
  },

  'Dashboard': {
    children: ['MetricCard[]', 'OpportunitiesList', 'ActivityFeed'],
    state: ['metrics', 'activities'],
    utils: ['generateDashboardMetrics()', 'generateRecentActivities()'],
  },

  'LoadingScreen': {
    children: ['RaidhoRune', 'ProgressBar'],
    state: ['progress'],
    timing: '3 second total duration',
  },
};

// ============================================================================
// 🎨 DESIGN SYSTEM REFERENCE
// ============================================================================

const DESIGN_REFERENCE = {
  'Color Palette': {
    'Primary Gold': '#d4af37 - Primary UI elements, titles, glows',
    'Gold Light': '#e6c547 - Hover states, highlights',
    'Deep Black': '#0d0d1a - Main background',
    'Deep Blue': '#0a1f3e - Secondary backgrounds',
    'Deep Blue Accent': '#1a3a5c - Tertiary backgrounds',
    'Cyan': '#00ffff - Highlights, accents',
    'Purple': '#9945ff - Supporting accent',
  },

  'Typography': {
    'Display Font': 'Inter - Headers, UI text',
    'Monospace Font': 'JetBrains Mono - Code, data',
    'Size Scale': 'xs (0.75rem) → sm → base → lg → xl → 2xl → 3xl',
  },

  'Spacing': {
    'Grid Base': '4px (Tailwind default)',
    'Padding Common': 'p-4 (mobile), md:p-6, lg:p-8',
    'Gap Common': 'gap-4 (mobile), md:gap-6, lg:gap-8',
  },

  'Animations': {
    'typing-reveal': '3s character reveal (50ms per char)',
    'glow-pulse': '3s pulsing shadow effect',
    'float': '6s vertical floating',
    'shimmer': '3s background shine',
    'beam': '2s horizontal sweep',
  },

  'Shadows & Glows': {
    'glow-gold': 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.6))',
    'glow-blue': 'drop-shadow(0 0 20px rgba(26, 58, 92, 0.6))',
    'glow-cyan': 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.4))',
  },
};

// ============================================================================
// 🚀 DEVELOPMENT QUICK REFERENCE
// ============================================================================

const DEVELOPMENT = {
  'Project Setup': [
    '1. npm install',
    '2. npm run dev',
    '3. Open http://localhost:3000',
  ],

  'Common Tasks': {
    'Add a new page': 'Create component in src/components/, add route in App.tsx',
    'Change colors': 'Edit tailwind.config.js (raido color scheme)',
    'Adjust animations': 'Edit src/index.css (keyframes section)',
    'Mock data': 'Edit src/utils/mockData.ts',
    'Add types': 'Add interfaces to src/types/index.ts',
    'Create utility': 'Add function to src/utils/format.ts',
  },

  'File Organization': {
    'Components': 'src/components/ - React components',
    'Hooks': 'src/hooks/ - Custom React hooks',
    'Types': 'src/types/ - TypeScript interfaces',
    'Utils': 'src/utils/ - Helper functions',
    'Config': 'src/config/ - Constants and config',
    'Styles': 'src/index.css - Global styles',
  },

  'Testing on Mobile': [
    '1. Chrome DevTools → Toggle Device Toolbar (Ctrl+Shift+M)',
    '2. Test at 375px (mobile), 768px (tablet), 1920px (desktop)',
    '3. Check touch targets are 44px+ tall',
    '4. Verify no horizontal scroll',
    '5. Test navigation menu on mobile',
  ],

  'Build & Deploy': [
    '1. npm run build',
    '2. Output in dist/',
    '3. npm run preview (test production build)',
    '4. Deploy dist/ to hosting (Vercel, Netlify, etc.)',
  ],
};

// ============================================================================
// 📚 DOCUMENTATION ROADMAP
// ============================================================================

const DOCS_ROADMAP = {
  'Getting Started': {
    file: 'QUICKSTART.md',
    covers: ['Installation', 'Project structure', 'Running locally', 'Basic features'],
  },

  'Development Guide': {
    file: 'DEVELOPMENT.md',
    covers: ['Workflow', 'Features', 'Components', 'Design system', 'Performance', 'Future enhancements'],
  },

  'Mobile Design': {
    file: 'MOBILE.md',
    covers: ['Responsive patterns', 'Breakpoints', 'Touch targets', 'Testing methods', 'Optimization'],
  },

  'Implementation Details': {
    file: 'PROJECT_COMPLETE.md',
    covers: ['Complete summary', 'File count', 'Feature completeness', 'Integration points', 'Next steps'],
  },

  'Main README': {
    file: 'README.md',
    covers: ['Project vision', 'Features', 'Tech stack', 'Getting started', 'Lore'],
  },
};

// ============================================================================
// 🔗 KEY LINKS WITHIN PROJECT
// ============================================================================

const NAVIGATION = {
  'Start Here': [
    '1. Read README.md for project overview',
    '2. Follow QUICKSTART.md for setup',
    '3. Run npm run dev',
    '4. Explore all pages in the app',
  ],

  'Explore Code': [
    'App.tsx - Main routing logic',
    'LandingPage.tsx - Landing page code',
    'OpportunityScanner.tsx - Scanner logic',
    'FlowSimulator.tsx - Flow builder logic',
    'Dashboard.tsx - Dashboard code',
  ],

  'Learn Styling': [
    'tailwind.config.js - Color definitions',
    'src/index.css - Animations and global styles',
    'MOBILE.md - Responsive design patterns',
  ],

  'Add Features': [
    'src/utils/mockData.ts - Data generation',
    'src/types/index.ts - Define new types',
    'src/utils/format.ts - Formatting helpers',
    'src/config/platform.ts - Constants',
  ],
};

// ============================================================================
// Export for reference
// ============================================================================

console.log(`
╔════════════════════════════════════════════════════════════════════╗
║         Raido — The Swift Provider - Project Index                ║
║                                                                    ║
║  A sovereign liquidity engine and opportunity hunter for Solana    ║
╚════════════════════════════════════════════════════════════════════╝

📍 QUICK NAVIGATION:
  → README.md - Project overview
  → QUICKSTART.md - Get started in 5 minutes
  → DEVELOPMENT.md - Development workflow
  → MOBILE.md - Mobile responsive design
  → PROJECT_COMPLETE.md - Implementation details

🎯 MAIN PAGES:
  /          - Landing page with Raidho rune
  /hunt      - Opportunity scanner
  /flow      - Capital flow simulator
  /dashboard - Metrics dashboard

📁 SOURCE ORGANIZATION:
  src/components/   - React components
  src/hooks/        - Custom hooks
  src/types/        - TypeScript interfaces
  src/utils/        - Utility functions
  src/config/       - Configuration

🚀 QUICK COMMANDS:
  npm install       - Install dependencies
  npm run dev       - Start dev server (port 3000)
  npm run build     - Build for production
  npm run preview   - Preview production build
  npm run lint      - Run linting

✨ KEY FEATURES:
  ✓ Cinematic landing page with Raidho rune
  ✓ Opportunity scanner with mock data
  ✓ Multi-step capital flow simulator
  ✓ Real-time dashboard with metrics
  ✓ Fully mobile-responsive (mobile-first)
  ✓ Dark esoteric aesthetic with gold/blue theme
  ✓ Particle effects and light beam animations
  ✓ Typing reveal animations
  ✓ TypeScript for type safety

📚 DOCUMENTATION:
  See individual .md files for detailed guides

The Swift Provider awaits. The hunt begins. ◆
`);

export { FILE_INDEX, FEATURES, COMPONENT_GRAPH, DESIGN_REFERENCE, DEVELOPMENT, DOCS_ROADMAP, NAVIGATION };
