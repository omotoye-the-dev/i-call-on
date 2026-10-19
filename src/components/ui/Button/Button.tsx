import type { JSX } from 'react'
import { clsx } from 'clsx'
import { Loader2 } from 'lucide-react'
import type { ButtonProps } from './types.ts'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  isActive = false,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps): JSX.Element {
  const isInteractive = !disabled && !isLoading

  const sizeClasses = {
    sm: 'px-4 py-1.5 text-sm rounded-xl',
    md: 'px-6 py-2.5 text-base rounded-2xl',
    lg: 'px-8 py-3.5 text-lg rounded-2xl font-bold',
  }[size]

  const variantClasses = clsx({
    // Primary glossy game CTA button
    'glossy-gradient text-white border-2 border-game-dark shadow-tactile-4 transition-all duration-150':
      variant === 'primary',
    'hover:brightness-105 active:translate-y-0.75 active:shadow-tactile-1':
      variant === 'primary' && isInteractive,

    // Secondary / Action button (e.g. Google, Apple, Leave Room)
    'bg-white text-game-text border-2 border-game-dark shadow-tactile-3 transition-all duration-150':
      variant === 'secondary',
    'hover:bg-surface-hover active:translate-y-0.5 active:shadow-tactile-1':
      variant === 'secondary' && isInteractive,

    // Outline button
    'bg-transparent text-game-text border-2 border-game-dark transition-colors':
      variant === 'outline',
    'hover:bg-black/5 active:bg-black/10':
      variant === 'outline' && isInteractive,

    // Segmented / Tab button (e.g., "This round" vs "Session")
    'border-2 border-game-dark transition-all duration-150 font-medium':
      variant === 'tab',
    'bg-game-primary text-white shadow-tactile-2':
      variant === 'tab' && isActive,
    'bg-white text-game-text hover:bg-surface-hover':
      variant === 'tab' && !isActive,

    // Link button
    'bg-transparent text-game-brand underline-offset-4 hover:underline p-0 font-medium':
      variant === 'link',

    // Ghost button
    'bg-transparent text-game-text hover:bg-black/5':
      variant === 'ghost',

    // Disabled state
    'opacity-60 cursor-not-allowed shadow-none': disabled || isLoading,
  })

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={clsx(
        'relative inline-flex items-center justify-center gap-2 font-display select-none outline-none focus-visible:ring-2 focus-visible:ring-game-primary focus-visible:ring-offset-2 cursor-pointer',
        sizeClasses,
        variantClasses,
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-current" aria-hidden="true" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span className="truncate">{children}</span>
      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0">{rightIcon}</span>
      )}
    </button>
  )
}
