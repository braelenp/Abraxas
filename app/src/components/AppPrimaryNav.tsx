import { NavLink } from 'react-router-dom';

const primaryNavItems = [
  { to: '/app/dashboard', label: 'Dashboard', shortLabel: 'Home' },
  { to: '/app/tokenize', label: 'Tokenize', shortLabel: 'Mint' },
  { to: '/app/vaults', label: 'My Vaults', shortLabel: 'Vaults' },
  { to: '/app/agents', label: 'Agents', shortLabel: 'Agents' },
] as const;

type AppPrimaryNavProps = {
  showLearnButton?: boolean;
};

export function AppPrimaryNav({ showLearnButton = true }: AppPrimaryNavProps) {
  return (
    <>
      {showLearnButton ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-20 z-50 mx-auto flex w-full max-w-md justify-end px-4">
          <NavLink
            to="/app/academy"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-amber-300/45 bg-slate-950/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200 shadow-[0_12px_32px_rgba(15,23,42,0.55)] backdrop-blur-xl transition hover:border-amber-200/70 hover:bg-slate-900"
          >
            <span className="text-base leading-none">L</span>
            <span>Learn</span>
          </NavLink>
        </div>
      ) : null}

      <nav className="z-40 mx-auto flex w-full max-w-md flex-none border-t border-cyan-300/15 bg-slate-950/94 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl">
        {primaryNavItems.map(({ to, label, shortLabel }) => (
          <NavLink
            key={to}
            to={to}
            end={true}
            className="flex flex-1 items-center justify-center"
          >
            {({ isActive }) => (
              <div
                className={`flex min-w-0 flex-col items-center rounded-2xl px-2 py-2 transition ${
                  isActive
                    ? 'bg-cyan-300/14 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="text-[11px] font-semibold tracking-wide sm:hidden">{shortLabel}</span>
                <span className="hidden text-[11px] font-semibold tracking-wide sm:block">{label}</span>
                <span
                  className={`mt-1 h-1 w-6 rounded-full transition ${
                    isActive ? 'bg-cyan-300' : 'bg-transparent'
                  }`}
                />
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}