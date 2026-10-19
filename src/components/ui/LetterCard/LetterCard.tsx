import type { JSX } from 'react'
import { clsx } from 'clsx'
import type { LetterCardProps } from './types.ts'

export function LetterCard({
  letter,
  label,
  variant = 'grid',
  state = 'default',
  categoryColor = 'name',
  customBgColor,
  size = 'md',
  tilt = 'none',
  onSelectLetter,
  disabled = false,
  className = '',
  onClick,
  ...rest
}: LetterCardProps): JSX.Element {
  const isUsed = state === 'used'
  const isSelected = state === 'selected'
  const isDisabled = disabled || state === 'disabled' || isUsed

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (isDisabled) return
    onClick?.(e)
    onSelectLetter?.(letter)
  }

  // Tilt transforms
  const tiltClasses = {
    none: 'rotate-0',
    'left-subtle': '-rotate-2',
    'right-subtle': 'rotate-2',
    'left-strong': '-rotate-6',
    'right-strong': 'rotate-6',
  }[tilt]

  // Category Theme Colors for Landing Tiles
  const categoryBgClasses = {
    name: 'bg-tile-name text-white',
    place: 'bg-tile-place text-white',
    animal: 'bg-tile-animal text-white',
    things: 'bg-tile-things text-white',
    custom: 'text-white',
  }[categoryColor]

  if (variant === 'category') {
    // Landing tile ("N"ame, "P"lace, etc.)
    const categorySizeClasses = {
      sm: 'w-16 h-16 p-1.5 rounded-xl text-2xl',
      md: 'w-20 h-20 p-2.5 rounded-2xl text-3xl',
      lg: 'w-24 h-24 p-3 rounded-2xl text-4xl',
      xl: 'w-28 h-28 p-3.5 rounded-3xl text-5xl',
    }[size]

    return (
      <button
        type="button"
        disabled={isDisabled}
        onClick={handleClick}
        style={customBgColor ? { backgroundColor: customBgColor } : undefined}
        className={clsx(
          'relative inline-flex flex-col items-center justify-center font-bold border-3 border-game-dark clay-tile select-none cursor-pointer',
          categorySizeClasses,
          categoryBgClasses,
          tiltClasses,
          className,
        )}
        aria-label={`${letter} ${label ?? ''}`}
        {...rest}
      >
        <div className="flex items-baseline leading-none">
          <span className="font-extrabold uppercase drop-shadow-sm">{letter}</span>
          {label && (
            <span className="text-xs font-semibold lowercase tracking-tight ml-0.5 opacity-90">
              {label}
            </span>
          )}
        </div>
      </button>
    )
  }

  if (variant === 'display') {
    // Big prominent letter tile (e.g. for Round active letter "S")
    const displaySizeClasses = {
      sm: 'w-14 h-14 rounded-xl text-2xl',
      md: 'w-20 h-20 rounded-2xl text-4xl',
      lg: 'w-28 h-28 rounded-3xl text-6xl',
      xl: 'w-36 h-36 rounded-3xl text-7xl',
    }[size]

    return (
      <div
        className={clsx(
          'relative inline-flex items-center justify-center font-extrabold bg-game-primary text-white border-3 border-game-dark shadow-tactile-6 select-none',
          displaySizeClasses,
          tiltClasses,
          className,
        )}
        aria-label={`Letter ${letter}`}
      >
        <span className="leading-none drop-shadow-sm">{letter.toUpperCase()}</span>
      </div>
    )
  }

  // Grid Letter Card (Alphabet keyboard: A-Z)
  const gridSizeClasses = {
    sm: 'w-10 h-10 text-base rounded-lg border-2',
    md: 'w-12 h-12 text-xl rounded-xl border-2',
    lg: 'w-14 h-14 text-2xl rounded-xl border-3',
    xl: 'w-16 h-16 text-3xl rounded-2xl border-3',
  }[size]

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={handleClick}
      className={clsx(
        'relative inline-flex flex-col items-center justify-center font-bold border-game-dark transition-all select-none',
        gridSizeClasses,
        {
          // Default unselected state
          'bg-white text-game-text hover:bg-surface-hover hover:scale-105 active:translate-y-0.5 shadow-tactile-2 cursor-pointer':
            state === 'default' && !isDisabled,

          // Selected letter
          'bg-game-primary text-white shadow-tactile-3 scale-105 cursor-pointer':
            isSelected,

          // Used state
          'bg-surface-disabled text-game-subtle border-game-border-disabled shadow-none cursor-not-allowed':
            isUsed,

          // Generic disabled state
          'opacity-50 cursor-not-allowed shadow-none':
            state === 'disabled',
        },
        className,
      )}
      aria-label={`Letter ${letter}${isUsed ? ' (used)' : ''}`}
      {...rest}
    >
      <span className="leading-none font-extrabold">{letter.toUpperCase()}</span>
      {isUsed && (
        <span className="text-micro font-medium leading-none text-game-muted mt-0.5 tracking-tight">
          used
        </span>
      )}
    </button>
  )
}
