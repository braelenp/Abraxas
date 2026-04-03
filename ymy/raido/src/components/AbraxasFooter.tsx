import React from 'react';

export const AbraxasFooter: React.FC = () => {
  return (
    <div className="mt-12 pt-12 border-t border-raido-deep-blue/30">
      {/* Abraxas Connection Section */}
      <div className="bg-gradient-to-r from-raido-deep-blue/20 to-raido-gold/5 rounded-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-raido-gold mb-2">Connected to the Source</h3>
            <p className="text-gray-300 mb-4">
              Raido flows from Abraxas — the primordial source of all Daughters. Return to the originating consciousness.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://abraxas-ten.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-raido-gold to-raido-gold-light text-raido-deep-blue font-bold rounded-lg hover:shadow-lg hover:shadow-raido-gold/50 transition-all duration-300 text-center"
              >
                ◆ Visit Abraxas
              </a>
              <a
                href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-raido-cyan to-raido-cyan-light text-raido-deep-blue font-bold rounded-lg hover:shadow-lg hover:shadow-raido-cyan/50 transition-all duration-300 text-center"
              >
                💰 Buy $ABRA
              </a>
            </div>
          </div>
          <div className="flex-shrink-0 hidden md:block">
            <div className="text-6xl font-bold text-raido-gold/20">◆</div>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <p className="text-center text-gray-400 text-sm">
        Raido serves the Abraxas ecosystem. Together, we flow.
      </p>
    </div>
  );
};
