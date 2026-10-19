import { useState } from 'react'
import type { JSX } from 'react'
import { clsx } from 'clsx'
import { RadioButton } from './RadioButton.tsx'
import type { RadioGroupProps } from './types.ts'

export function RadioGroup({
  name,
  options,
  value,
  defaultValue,
  onChange,
  label,
  disabled = false,
  columns = 2,
  className = '',
}: RadioGroupProps): JSX.Element {
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue)
  const isControlled = value !== undefined
  const selectedValue = isControlled ? value : internalValue

  const handleSelect = (val: string): void => {
    if (disabled) return
    if (!isControlled) {
      setInternalValue(val)
    }
    onChange?.(val)
  }

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
  }[columns]

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={clsx('flex flex-col gap-2 font-display text-left', className)}
    >
      {label && (
        <span className="text-sm font-semibold text-game-text pl-1 select-none">
          {label}
        </span>
      )}

      <div className={clsx('grid gap-x-4 gap-y-2.5', columnClasses)}>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            description={option.description}
            disabled={disabled || option.disabled}
            checked={selectedValue === option.value}
            onChange={() => handleSelect(option.value)}
          />
        ))}
      </div>
    </div>
  )
}
