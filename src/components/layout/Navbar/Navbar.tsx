import type { JSX } from 'react'
import { clsx } from 'clsx'
import type { NavbarProps } from './types.ts'

export function Navbar({
  brandText = 'I Call On',
  actionText = 'create account',
  onActionClick,
  borderStyle = 'full',
  className = '',
  children,
}: NavbarProps): JSX.Element {
  const borderClasses = clsx({
    'border-2 border-game-dark': borderStyle === 'full',
    'border-b-2 border-game-dark': borderStyle === 'bottom',
    'border-none': borderStyle === 'none',
  })

  return (
    <header
      role="banner"
      className={clsx(
        'w-full bg-white px-6 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between',
        borderClasses,
        className,
      )}
    >
      <div className="flex items-center">
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-game-brand select-none">
          {brandText}
        </span>
      </div>

      <div className="flex items-center">
        {children ?? (
          <button
            type="button"
            onClick={onActionClick}
            className="font-display text-base sm:text-lg font-bold text-game-brand underline underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none p-0 focus-visible:outline-2 focus-visible:outline-game-brand focus-visible:outline-offset-2"
          >
            {actionText}
          </button>
        )}
      </div>
    </header>
  )
}
