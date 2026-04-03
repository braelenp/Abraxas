#!/bin/bash

# Raido Project Setup Script
# Installs dependencies and prepares the development environment

echo "🚀 Raido — The Swift Provider"
echo "Setting up development environment..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✓ Dependencies installed"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✓ Created .env.local (review and update as needed)"
    echo ""
fi

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. npm run dev       - Start development server"
echo "  2. Open http://localhost:3000 in your browser"
echo ""
echo "For more information, see DEVELOPMENT.md"
echo ""
echo "The Swift Provider awaits... ◆"
