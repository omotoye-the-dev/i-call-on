import { useId } from 'react'
import type { JSX } from 'react'
import { clsx } from 'clsx'
import type { RadioButtonProps } from './types.ts'

export function RadioButton({
  type = 'radio',
  label,
  checked = false,
  disabled = false,
  description,
  dotColor,
  className = '',
  id,
  onChange,
  ...rest
}: RadioButtonProps): JSX.Element {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <label
      htmlFor={inputId}
      className={clsx(
        'inline-flex items-center gap-2.5 font-display select-none transition-opacity',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90',
        className,
      )}
    >
      <div className="relative flex items-center justify-center shrink-0">
        <input
          id={inputId}
          type={type}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="peer sr-only"
          {...rest}
        />

        {/* Outer Circle matching Figma */}
        <div
          className={clsx(
            'w-4.5 h-4.5 rounded-full border-2 border-game-dark bg-white transition-all flex items-center justify-center',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-game-primary peer-focus-visible:ring-offset-1',
            checked && 'border-game-dark',
          )}
        >
          {/* Inner Terracotta Dot */}
          {checked && (
            <div
              style={dotColor ? { backgroundColor: dotColor } : undefined}
              className={clsx(
                'w-2 h-2 rounded-full',
                !dotColor && 'bg-game-primary animate-in zoom-in-75 duration-100',
              )}
            />
          )}
        </div>
      </div>

      {(label || description) && (
        <div className="flex flex-col text-left">
          {label && (
            <span className="text-sm font-medium text-game-text leading-none">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-game-muted mt-0.5">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  )
}
