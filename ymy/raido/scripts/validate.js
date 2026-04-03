#!/usr/bin/env node

/**
 * Raido Post-Installation Script
 * 
 * Validates project setup and provides next steps.
 */

const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const requiredFiles = [
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'tailwind.config.js',
  'index.html',
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
];

console.log('\n🚀 Raido — The Swift Provider\n');
console.log('Validating project structure...\n');

let allValid = true;

requiredFiles.forEach((file) => {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${file}`);
  } else {
    console.log(`✗ ${file} (MISSING)`);
    allValid = false;
  }
});

console.log('\n---\n');

if (allValid) {
  console.log('✅ All required files present!\n');
  console.log('Next steps:\n');
  console.log('  1. npm install              # Install dependencies (if not done)');
  console.log('  2. npm run dev              # Start development server');
  console.log('  3. Open http://localhost:3000\n');
  console.log('For more info, see DEVELOPMENT.md\n');
} else {
  console.log('⚠️ Some files are missing. Please check your setup.\n');
  process.exit(1);
}

console.log('The Swift Provider awaits... ◆\n');
