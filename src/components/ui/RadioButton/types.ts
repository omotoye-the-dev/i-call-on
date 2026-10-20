import type { InputHTMLAttributes, ReactNode } from 'react'

export interface RadioOption {
  label: string
  value: string
  disabled?: boolean
  description?: string
}

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: 'radio' | 'checkbox'
  label?: ReactNode
  checked?: boolean
  disabled?: boolean
  description?: string
  dotColor?: string
}

export interface BaseRadioGroupProps {
  name: string
  options: RadioOption[]
  label?: string
  disabled?: boolean
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export interface SingleRadioGroupProps extends BaseRadioGroupProps {
  multiple?: false
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export interface MultiRadioGroupProps extends BaseRadioGroupProps {
  multiple: true
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
}

export type RadioGroupProps = SingleRadioGroupProps | MultiRadioGroupProps
