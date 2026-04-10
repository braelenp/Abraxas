import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'EN', flag: '🇬🇧' },
  { code: 'es', name: 'ES', flag: '🇪🇸' },
  { code: 'pt', name: 'PT', flag: '🇵🇹' },
  { code: 'fr', name: 'FR', flag: '🇫🇷' },
  { code: 'de', name: 'DE', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'AR', flag: '🇸🇦' },
];

interface LanguageSwitcherProps {
  variant?: 'compact' | 'expanded';
  showInProfile?: boolean;
}

export function LanguageSwitcher({ variant = 'compact', showInProfile = false }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'compact') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-900/30 border border-purple-500/30 hover:border-purple-400/60 hover:bg-purple-900/50 transition-all duration-200 backdrop-blur-sm"
          aria-label="Change language"
        >
          <Globe size={18} className="text-purple-400" />
          <span className="text-sm font-medium text-purple-300">{currentLang.flag}</span>
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-purple-500/30 rounded-xl shadow-xl backdrop-blur-sm z-50 overflow-hidden">
              <div className="p-2 space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
                      i18n.language === lang.code
                        ? 'bg-purple-600/50 border border-purple-400/60 text-white'
                        : 'text-slate-300 hover:bg-purple-900/30 border border-transparent'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Expanded variant - horizontal scrollable row
  return (
    <div className={`w-full ${showInProfile ? 'mb-4' : ''}`}>
      <label className="block text-sm font-medium text-purple-300 mb-3 px-4">
        Choose Language
      </label>
      <div className="flex gap-2 px-4 overflow-x-auto pb-2 scrollbar-hide">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-150 flex-shrink-0 ${
              i18n.language === lang.code
                ? 'bg-purple-600/60 border border-purple-400 text-white shadow-lg shadow-purple-600/20'
                : 'bg-purple-900/20 border border-purple-500/30 text-slate-300 hover:bg-purple-900/40 hover:border-purple-400/60'
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="text-sm font-medium hidden sm:inline">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
