import type { JSX, KeyboardEvent } from 'react'
import { clsx } from 'clsx'
import { Minus, Plus } from 'lucide-react'
import type { TimeSetterProps } from './types.ts'

export function TimeSetter({
  value,
  onChange,
  min = 10,
  max = 300,
  step = 5,
  format = 'time',
  formatValue,
  label,
  disabled = false,
  className = '',
  id,
}: TimeSetterProps): JSX.Element {
  const canDecrement = !disabled && value > min
  const canIncrement = !disabled && value < max

  const handleDecrement = (): void => {
    if (!canDecrement) return
    const next = Math.max(min, value - step)
    onChange(next)
  }

  const handleIncrement = (): void => {
    if (!canIncrement) return
    const next = Math.min(max, value + step)
    onChange(next)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (disabled) return
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault()
      handleDecrement()
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault()
      handleIncrement()
    }
  }

  // Format value display
  const renderDisplayValue = (): string => {
    if (formatValue) {
      return formatValue(value)
    }
    if (format === 'time') {
      const minutes = Math.floor(value / 60)
      const seconds = value % 60
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
    return value.toString()
  }

  return (
    <div className={clsx('w-full flex flex-col gap-1.5 font-display text-left', className)}>
      {label && (
        <span className="text-sm font-semibold text-game-text select-none pl-1">
          {label}
        </span>
      )}

      <div
        id={id}
        role="spinbutton"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label ?? 'Time setter'}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        className={clsx(
          'w-full bg-white border-2 border-game-dark rounded-xl px-2 py-1.5 flex items-center justify-between select-none outline-none focus-visible:ring-2 focus-visible:ring-game-primary shadow-tactile-soft',
          disabled && 'opacity-60 bg-surface-subtle border-game-border-disabled cursor-not-allowed',
        )}
      >
        {/* Decrement Button */}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={!canDecrement}
          aria-label="Decrease value"
          className={clsx(
            'w-7 h-7 flex items-center justify-center rounded-lg text-game-text transition-all cursor-pointer',
            canDecrement
              ? 'hover:bg-surface-subtle active:scale-90 text-game-text'
              : 'opacity-30 cursor-not-allowed',
          )}
        >
          <Minus className="w-4 h-4 stroke-3" />
        </button>

        {/* Value Display */}
        <span className="font-extrabold text-base sm:text-lg text-game-text tracking-wide px-4">
          {renderDisplayValue()}
        </span>

        {/* Increment Button */}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={!canIncrement}
          aria-label="Increase value"
          className={clsx(
            'w-7 h-7 flex items-center justify-center rounded-lg text-game-text transition-all cursor-pointer',
            canIncrement
              ? 'hover:bg-surface-subtle active:scale-90 text-game-text'
              : 'opacity-30 cursor-not-allowed',
          )}
        >
          <Plus className="w-4 h-4 stroke-3" />
        </button>
      </div>
    </div>
  )
}
