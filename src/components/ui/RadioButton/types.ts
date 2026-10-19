import type { InputHTMLAttributes, ReactNode } from 'react'

export interface RadioOption {
  label: string
  value: string
  disabled?: boolean
  description?: string
}

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
  checked?: boolean
  disabled?: boolean
  description?: string
  dotColor?: string
}

export interface RadioGroupProps {
  name: string
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  label?: string
  disabled?: boolean
  columns?: 1 | 2 | 3 | 4
  className?: string
}
