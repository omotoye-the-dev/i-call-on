import type { JSX } from 'react'
import { clsx } from 'clsx'
import type { CardProps } from './types.ts'

export function Card({
  children,
  variant = 'default',
  title,
  subtitle,
  headerAction,
  footer,
  className = '',
  ...rest
}: CardProps): JSX.Element {
  const variantStyles = {
    // White game card
    default: 'bg-white text-game-text border-3 border-game-dark shadow-tactile-6',
    // Brown primary room code / active card
    primary: 'bg-game-primary text-white border-3 border-game-dark shadow-tactile-6',
    // Soft muted beige card
    muted: 'bg-surface-muted text-game-text border-2 border-game-dark shadow-tactile-4',
    // Banner notice card (e.g. Reconnecting...)
    banner: 'bg-banner text-game-primary-dark border-2 border-game-dark shadow-tactile-3',
  }[variant]

  return (
    <div
      className={clsx(
        'rounded-3xl p-5 sm:p-7 font-display transition-all',
        variantStyles,
        className,
      )}
      {...rest}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex flex-col text-left">
            {title && (
              <h3
                className={clsx(
                  'text-xl sm:text-2xl font-extrabold leading-tight',
                  variant === 'primary' ? 'text-white' : 'text-game-text',
                )}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                className={clsx(
                  'text-xs sm:text-sm font-medium mt-0.5',
                  variant === 'primary' ? 'text-white/80' : 'text-game-muted',
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}

      <div>{children}</div>

      {footer && (
        <div className="mt-5 pt-4 border-t-2 border-game-dark/10 flex items-center justify-between">
          {footer}
        </div>
      )}
    </div>
  )
}
