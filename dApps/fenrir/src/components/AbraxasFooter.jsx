import React from 'react'

const AbraxasFooter = () => {
  return (
    <div className="relative z-10 mt-24 mb-32">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="border-2 border-cyan-bright bg-deep-black bg-opacity-60 backdrop-blur p-12 rounded-lg text-center"
          style={{
            boxShadow:
              '0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.1)',
          }}
        >
          <p className="font-mono text-sm text-cyan-bright mb-4">
            ◆ CONNECTED TO THE SOURCE ◆
          </p>
          <h3
            className="font-display text-2xl font-bold mb-6"
            style={{
              textShadow: '0 0 20px rgba(251, 191, 36, 0.8)',
              color: '#fbbf24',
            }}
          >
            Fenrir flows from Abraxas
          </h3>
          <p className="font-mono text-sm text-cyan-bright mb-8 max-w-2xl mx-auto">
            The primordial source of all sovereign systems. Fenrir is one expression
            of Abraxas's limitless potential—a protector born from collective wisdom.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://abraxas-tokenization-engine.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="ui-action ui-action-gold"
            >
              ← VISIT ABRAXAS →
            </a>
            <a
              href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
              target="_blank"
              rel="noopener noreferrer"
              className="ui-action ui-action-cyan"
            >
              BUY $ABRA TOKEN
            </a>
          </div>

          <div className="mt-8 flex justify-center gap-6 text-2xl opacity-50">
            <span style={{ color: '#ff6024' }}>⚔</span>
            <span style={{ color: '#9945ff' }}>◆</span>
            <span style={{ color: '#00ffff' }}>✦</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AbraxasFooter
