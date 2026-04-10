/**
 * MULTI-LANGUAGE REFACTOR GUIDE
 * Apply these patterns to all remaining pages and components
 */

// ============================================================================
// PATTERN 1: Basic Translation Setup in Any Component
// ============================================================================

import { useTranslation } from 'react-i18next';

export function ExampleComponent() {
  const { t, i18n } = useTranslation();
  
  // Access translations
  const buttonText = t('buttons.continue');           // "Continue"
  const errorMsg = t('errors.walletNotConnected');    // "Wallet not connected"
  const currentLang = i18n.language;                   // "en", "es", "pt", etc.
  
  return (
    <button>{buttonText}</button>
  );
}

// ============================================================================
// PATTERN 2: Handling Responsive Text (German, Arabic - longer words)
// ============================================================================

// Add CSS to handle text wrapping better for longer languages
// In styles.css, add:
/*
@media (lang: de), (lang: ar) {
  .responsive-text {
    font-size: 0.9em;
    line-height: 1.5;
    word-break: break-word;
  }
  
  .compact-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.85em;
  }
}
*/

// In components:
function ResponsiveButton() {
  const { t } = useTranslation();
  
  return (
    <button className="compact-button rounded-lg bg-purple-600 px-4 py-2 text-sm">
      {t('buttons.submit')}
    </button>
  );
}

// ============================================================================
// PATTERN 3: Updating LandingPage with Translations
// ============================================================================

import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export function LandingPageWithTranslations() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 text-cyan-50">
      {/* Header with Language Switcher */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-cyan-300/20 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/assets/abraxas-logo-graphic.jpg"
                alt="Abraxas Logo"
                className="h-10 w-auto rounded-lg object-contain shadow-[0_0_20px_rgba(6,182,212,0.3)] sm:h-12"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden flex-1 justify-center sm:flex">
                <p className="font-mono text-xs tracking-wider text-cyan-200/80 sm:text-sm">
                  &gt; {t('landing.subtitle')}
                </p>
              </div>
              <LanguageSwitcher variant="compact" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Translations */}
      <section className="relative flex min-h-[100vh] flex-col items-center justify-center px-4 pb-12 pt-20 sm:px-6">
        <div className="mx-auto max-w-5xl space-y-6 text-center sm:space-y-8">
          <div>
            <h1 className="text-5xl font-black leading-tight tracking-[0.15em] sm:text-7xl lg:text-8xl">
              <span className="inline-block text-white animate-glitch">
                ABRAXAS
              </span>
            </h1>
          </div>

          <div className="space-y-4">
            <p className="font-mono text-base sm:text-lg font-semibold text-cyan-300 tracking-wider uppercase">
              {t('landing.title')}
            </p>
            <p className="text-xl sm:text-2xl text-cyan-200 font-light">
              {t('landing.description')}
            </p>
          </div>

          {/* Features Grid with Translations */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: t('landing.feature1Title'),
                desc: t('landing.feature1Desc'),
              },
              {
                title: t('landing.feature2Title'),
                desc: t('landing.feature2Desc'),
              },
              {
                title: t('landing.feature3Title'),
                desc: t('landing.feature3Desc'),
              },
              {
                title: t('landing.feature4Title'),
                desc: t('landing.feature4Desc'),
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-6 backdrop-blur-sm"
              >
                <h3 className="font-bold text-cyan-300 mb-2 responsive-text">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-300 responsive-text">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <button className="rounded-xl border border-cyan-300/40 bg-slate-900/60 px-6 py-3 text-sm font-bold uppercase tracking-wider text-cyan-200 transition hover:border-cyan-300/60 hover:bg-slate-800/60">
              {t('landing.cta')}
            </button>
            <button className="rounded-xl border border-purple-300/40 bg-slate-900/60 px-6 py-3 text-sm font-bold uppercase tracking-wider text-purple-200 transition hover:border-purple-300/60 hover:bg-slate-800/60">
              {t('landing.whitepaper')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer with Links - All Translated */}
      <footer className="border-t border-cyan-500/20 bg-slate-950/50 py-8 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="flex gap-4 justify-center flex-wrap text-sm">
            <a href="#" className="text-cyan-400 hover:text-cyan-300">
              {t('landing.documentation')}
            </a>
            <a href="#" className="text-cyan-400 hover:text-cyan-300">
              {t('landing.community')}
            </a>
            <a href="#" className="text-cyan-400 hover:text-cyan-300">
              {t('landing.roadmap')}
            </a>
          </div>
          <p className="text-xs text-slate-400">
            © 2026 Abraxas Protocol. {t('common.loading')}
          </p>
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// PATTERN 4: Handling Dynamic Content (Arrays, Loops)
// ============================================================================

export function NavigationWithTranslations() {
  const { t } = useTranslation();

  // Create navigation items with translated labels
  const navItems = [
    { id: 'profile', label: t('nav.profile'), icon: '✧' },
    { id: 'forge', label: t('nav.forge'), icon: 'ᚲ' },
    { id: 'market', label: t('nav.market'), icon: 'ᛋ' },
    { id: 'vaults', label: t('nav.vaults'), icon: 'ᚨ' },
  ];

  return (
    <nav className="flex gap-4">
      {navItems.map((item) => (
        <button key={item.id} className="flex items-center gap-2 px-4 py-2 rounded-lg">
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

// ============================================================================
// PATTERN 5: Error Handling with Translations
// ============================================================================

export function WalletErrorExample() {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      // ... wallet connection logic
    } catch (err) {
      // Use translation keys instead of hardcoded messages
      if (err instanceof Error && err.message.includes('not found')) {
        setError(t('errors.walletNotConnected'));
      } else {
        setError(t('errors.transactionFailed'));
      }
    }
  };

  return (
    <div>
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}
      <button onClick={connectWallet}>
        {t('buttons.connect')}
      </button>
    </div>
  );
}

// ============================================================================
// PATTERN 6: Modals and Dialog Content
// ============================================================================

export function WhitepaperModalExample() {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="max-w-2xl w-full max-h-[80vh] bg-slate-900 border border-cyan-500/30 rounded-2xl p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-cyan-300">
            {t('modals.whitepaper')}
          </h2>
          <button className="text-slate-400 hover:text-white">
            {t('modals.close')}
          </button>
        </div>

        <p className="text-slate-300 mb-4">
          {t('modals.whitepaperDesc')}
        </p>

        {/* Document content here */}

        <div className="mt-6 flex gap-3 justify-end">
          <button className="px-4 py-2 rounded-lg border border-slate-500 text-slate-300 hover:bg-slate-800">
            {t('modals.cancel')}
          </button>
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">
            {t('modals.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PATTERN 7: Form Labels and Inputs
// ============================================================================

export function FormWithTranslations() {
  const { t } = useTranslation();

  return (
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {t('wallet.address')}
        </label>
        <input
          type="text"
          placeholder={t('wallet.address')}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {t('trading.buyPrice')}
        </label>
        <input
          type="number"
          placeholder={t('trading.buyPrice')}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white"
        />
      </div>

      <button type="submit" className="w-full rounded-lg bg-purple-600 py-2 text-white font-bold">
        {t('buttons.submit')}
      </button>
    </form>
  );
}

// ============================================================================
// PATTERN 8: Toast Notifications (Success/Error Messages)
// ============================================================================

export function ToastNotificationExample() {
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAction = async () => {
    try {
      // ... perform action
      setShowSuccess(true);
      // Show toast with translated message
      console.log(t('success.transactionComplete'));
    } catch (error) {
      console.error(t('errors.transactionFailed'));
    }
  };

  return (
    <div>
      {showSuccess && (
        <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm">
          ✓ {t('success.transactionComplete')}
        </div>
      )}
      <button onClick={handleAction}>
        {t('buttons.submit')}
      </button>
    </div>
  );
}

// ============================================================================
// TIPS FOR RESPONSIVE SIZING
// ============================================================================

/*
For longer languages (German, Arabic):

1. Use flexible containers:
   - Replace fixed widths with max-w-* classes
   - Use flex-wrap and flex-shrink-0 where needed

2. Font sizing:
   - Base: text-sm or text-base
   - Reduce to text-xs for longer languages like German/Arabic
   - Use media queries or conditional checking

3. Text wrapping:
   - Always use line-clamp, truncate, or break-words strategically
   - Test with German and Arabic to ensure no overflow

4. Button sizing:
   - Use px-4 py-2 (flexible) instead of fixed w-40 h-10
   - Button text should be centered and not overflow

5. RTL Support (Arabic):
   - Currently using LTR layout
   - For full RTL support, add dir="rtl" to root element
   - Adjust margin/padding directions: ml-4 → rtl:mr-4

Example responsive component:
*/

export function ResponsiveComponentExample() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className={isArabic ? 'rtl' : 'ltr'}>
      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold line-clamp-2">
        {t('landing.title')}
      </h1>
      <p className="text-xs sm:text-sm text-slate-300 break-words">
        {t('landing.description')}
      </p>
    </div>
  );
}

// ============================================================================
// HOW TO APPLY TO ALL PAGES
// ============================================================================

/*
For each remaining page/component:

1. Add import:
   import { useTranslation } from 'react-i18next';
   import { LanguageSwitcher } from '../components/LanguageSwitcher';

2. Add hook at the top of component:
   const { t } = useTranslation();

3. Replace all hardcoded strings with t() calls:
   "Connect Wallet" → t('buttons.connect')
   "My Profile" → t('profile.card')
   etc.

4. Add LanguageSwitcher to:
   - Top-right header (done in App.tsx)
   - Profile page (done)
   - Landing page (add in header section)

5. Test with different languages to ensure:
   - Text fits without overflow
   - Long translations don't break layout
   - All UI elements align properly
   - Icons and text are properly spaced

Updated files:
✓ src/lib/i18n.ts - Configuration
✓ src/locales/*.json - All 7 language translations
✓ src/components/LanguageSwitcher.tsx - Language switcher component
✓ src/main.tsx - Added I18nextProvider wrapper
✓ src/App.tsx - Added LanguageSwitcher to header, updated nav items
✓ src/pages/ProfilePage.tsx - Added translations and LanguageSwitcher
*/
