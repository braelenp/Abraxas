import React from 'react'

interface CTAButton {
  label: string
  variant: 'primary' | 'secondary' | 'tertiary'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  href?: string
}

interface CTAButtonsProps {
  buttons: CTAButton[]
  className?: string
}

const CTAButtons: React.FC<CTAButtonsProps> = ({ buttons, className = '' }) => {
  const getButtonClass = (variant: string) => {
    const baseClasses = 'px-4 md:px-6 py-2 md:py-3 rounded-lg font-black text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-95'
    const variants: Record<string, string> = {
      primary: `${baseClasses} bg-gradient-to-r from-gold to-amber-400 hover:from-amber-300 hover:to-yellow-400 border border-gold/80 text-slate-900 shadow-[0_0_30px_rgba(249,204,117,0.6)] hover:shadow-[0_0_50px_rgba(249,204,117,0.8)]`,
      secondary: `${baseClasses} bg-transparent border border-cyan-300/80 text-cyan-300 hover:bg-cyan-300/10 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]`,
      tertiary: `${baseClasses} bg-transparent border border-slate-400/50 text-slate-300 hover:border-slate-200 hover:text-slate-100 transition-all duration-300`,
    }
    return variants[variant] || variants.primary
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center flex-wrap ${className}`}>
      {buttons.map((button, index) => {
        if (button.href) {
          return (
            <a
              key={index}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              className={getButtonClass(button.variant)}
            >
              {button.label}
            </a>
          )
        }
        return (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              button.onClick?.(e)
            }}
            type="button"
            className={getButtonClass(button.variant)}
          >
            {button.label}
          </button>
        )
      })}
    </div>
  )
}

export default CTAButtons
