/**
 * dApp Template Scaffolding
 * Generates complete dApp project structures from scratch
 */

export interface DAppTemplate {
  name: string
  description: string
  structure: Record<string, string>
}

/**
 * Generate a minimal dApp scaffold with React + Vite + Tailwind + Solana
 */
export function generateDAppScaffold(prompt: string, appName: string): DAppTemplate {
  const sanitizedName = appName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  
  return {
    name: appName,
    description: prompt,
    structure: {
      'package.json': generatePackageJson(sanitizedName),
      'tsconfig.json': generateTsConfig(),
      'vite.config.ts': generateViteConfig(),
      'tailwind.config.ts': generateTailwindConfig(),
      'postcss.config.js': generatePostCssConfig(),
      'eslint.config.js': generateEslintConfig(),
      'index.html': generateHTML(appName),
      'src/main.tsx': generateMainTsx(),
      'src/App.tsx': generateAppTsx(prompt),
      'src/vite-env.d.ts': generateViteEnvDts(),
      'src/styles.css': generateStylesCss(),
      '.gitignore': generateGitignore(),
      'README.md': generateReadme(appName, prompt),
      'public/.gitkeep': '',
      'src/components/.gitkeep': '',
    },
  }
}

function generatePackageJson(name: string): string {
  return JSON.stringify({
    name,
    version: '0.1.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'tsc -b && vite build',
      preview: 'vite preview',
      lint: 'eslint .',
    },
    dependencies: {
      react: '^19.0.0',
      'react-dom': '^19.0.0',
      '@solana/wallet-adapter-react': '^0.15.35',
      '@solana/wallet-adapter-react-ui': '^0.9.32',
      '@solana/wallet-adapter-wallets': '^0.19.32',
      '@solana/web3.js': '^1.101.0',
      'lucide-react': '^0.408.0',
    },
    devDependencies: {
      '@types/react': '^18.3.5',
      '@types/react-dom': '^18.3.0',
      '@vitejs/plugin-react': '^4.3.0',
      'autoprefixer': '^10.4.20',
      'postcss': '^8.4.41',
      'tailwindcss': '^3.4.7',
      'typescript': '^5.5.2',
      'vite': '^6.4.1',
    },
  }, null, 2)
}

function generateTsConfig(): string {
  return JSON.stringify({
    compilerOptions: {
      target: 'ES2020',
      useDefineForClassFields: true,
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      skipLibCheck: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true,
      resolveJsonModule: true,
      moduleResolution: 'bundler',
    },
    include: ['src'],
    references: [{ path: './tsconfig.node.json' }],
  }, null, 2)
}

function generateViteConfig(): string {
  return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
})`
}

function generateTailwindConfig(): string {
  return `import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#1a1a1a',
        steel: '#364537',
        offwhite: '#e8e8e8',
        gold: '#d4a574',
      },
    },
  },
  plugins: [],
} satisfies Config`
}

function generatePostCssConfig(): string {
  return `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`
}

function generateEslintConfig(): string {
  return `import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import typescript from 'typescript-eslint'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
  ...typescript.configs.recommended,
]`
}

function generateHTML(appName: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${appName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
}

function generateMainTsx(): string {
  return `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`
}

function generateAppTsx(prompt: string): string {
  return `export default function App() {
  return (
    <div className="min-h-screen bg-charcoal text-offwhite">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black uppercase tracking-widest mb-4 text-gold">
          New dApp
        </h1>
        <p className="text-offwhite/70 mb-8">
          ${prompt}
        </p>
        <div className="bg-steel/30 border-2 border-gold/20 p-8 rounded">
          <p className="text-sm text-offwhite/60">
            This dApp was auto-generated and pushed to your GitHub repository.
            Customize this component to match your vision.
          </p>
        </div>
      </div>
    </div>
  )
}`
}

function generateViteEnvDts(): string {
  return `/// <reference types="vite/client" />`
}

function generateStylesCss(): string {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-charcoal text-offwhite;
}

.btn-primary {
  @apply px-6 py-3 bg-gold text-charcoal font-bold uppercase tracking-wider border-2 border-gold hover:bg-gold/90 transition-all;
}

.btn-secondary {
  @apply px-6 py-3 bg-transparent text-gold font-bold uppercase tracking-wider border-2 border-gold hover:bg-gold/10 transition-all;
}`
}

function generateGitignore(): string {
  return `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?`
}

function generateReadme(appName: string, prompt: string): string {
  return `# ${appName}

${prompt}

Generated by Genesis — The Creator Son of Sophia

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`

## Author

Created via Genesis dApp Factory on Solana Blockchain
`
}
