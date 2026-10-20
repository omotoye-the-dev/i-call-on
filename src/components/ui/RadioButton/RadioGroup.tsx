import { useState } from 'react'
import type { JSX } from 'react'
import { clsx } from 'clsx'
import { RadioButton } from './RadioButton.tsx'
import type { RadioGroupProps } from './types.ts'

export function RadioGroup(props: RadioGroupProps): JSX.Element {
  const {
    name,
    options,
    label,
    disabled = false,
    columns = 2,
    className = '',
  } = props

  const isMulti = props.multiple === true

  const [internalSingle, setInternalSingle] = useState<string | undefined>(
    !isMulti ? props.defaultValue : undefined,
  )
  const [internalMulti, setInternalMulti] = useState<string[]>(
    isMulti ? (props.defaultValue ?? []) : [],
  )

  const isControlled = props.value !== undefined

  const selectedSingle = !isMulti
    ? (isControlled ? props.value : internalSingle)
    : undefined

  const selectedMulti = isMulti
    ? (isControlled ? (props.value ?? []) : internalMulti)
    : []

  const handleSelect = (val: string): void => {
    if (disabled) return

    if (props.multiple) {
      const current = selectedMulti
      const exists = current.includes(val)
      const next = exists
        ? current.filter((item) => item !== val)
        : [...current, val]

      if (!isControlled) {
        setInternalMulti(next)
      }
      props.onChange?.(next)
    } else {
      if (!isControlled) {
        setInternalSingle(val)
      }
      props.onChange?.(val)
    }
  }

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
  }[columns]

  return (
    <div
      role={isMulti ? 'group' : 'radiogroup'}
      aria-label={label}
      className={clsx('flex flex-col gap-2 font-display text-left', className)}
    >
      {label && (
        <span className="text-sm font-semibold text-game-text pl-1 select-none">
          {label}
        </span>
      )}

      <div className={clsx('grid gap-x-4 gap-y-2.5', columnClasses)}>
        {options.map((option) => {
          const isChecked = isMulti
            ? selectedMulti.includes(option.value)
            : selectedSingle === option.value

          return (
            <RadioButton
              key={option.value}
              name={name}
              value={option.value}
              type={isMulti ? 'checkbox' : 'radio'}
              label={option.label}
              description={option.description}
              disabled={disabled || option.disabled}
              checked={isChecked}
              onChange={() => handleSelect(option.value)}
            />
          )
        })}
      </div>
    </div>
  )
}
