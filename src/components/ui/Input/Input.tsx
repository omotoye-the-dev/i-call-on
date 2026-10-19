import { useId, useState } from 'react'
import type { JSX } from 'react'
import { clsx } from 'clsx'
import { Eye, EyeOff } from 'lucide-react'
import type { InputProps } from './types.ts'

export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  allowPasswordToggle = false,
  inputSize = 'md',
  type = 'text',
  disabled = false,
  className = '',
  id,
  ...rest
}: InputProps): JSX.Element {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`
  const helperId = `${inputId}-helper`

  const isPassword = type === 'password'
  const [showPassword, setShowPassword] = useState(false)
  const actualType = isPassword && allowPasswordToggle ? (showPassword ? 'text' : 'password') : type

  const sizeStyles = {
    sm: 'h-9 px-3 text-sm rounded-xl',
    md: 'h-11 px-4 text-base rounded-2xl',
    lg: 'h-13 px-5 text-lg rounded-2xl font-medium',
  }[inputSize]

  const hasLeftIcon = Boolean(leftIcon)
  const hasRightAction = Boolean(rightIcon || (isPassword && allowPasswordToggle))

  return (
    <div className="w-full flex flex-col gap-1.5 font-display text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-game-text select-none pl-1"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center w-full">
        {hasLeftIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-game-muted shrink-0">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          type={actualType}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={clsx(
            'w-full bg-white text-game-text placeholder:text-game-subtle border-2 transition-all outline-none font-medium',
            sizeStyles,
            hasLeftIcon && 'pl-10',
            hasRightAction && 'pr-10',
            error
              ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/20'
              : 'border-game-dark focus:border-game-primary focus:ring-2 focus:ring-game-primary/20 shadow-tactile-soft',
            disabled && 'bg-surface-subtle border-game-border-disabled text-game-subtle cursor-not-allowed',
            className,
          )}
          {...rest}
        />

        {isPassword && allowPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3.5 flex items-center text-game-muted hover:text-game-text focus:outline-none transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}

        {!isPassword && rightIcon && (
          <div className="absolute right-3.5 flex items-center text-game-muted">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p id={errorId} className="text-xs font-semibold text-danger pl-1">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-game-muted pl-1">
          {helperText}
        </p>
      ) : null}
    </div>
  )
}
