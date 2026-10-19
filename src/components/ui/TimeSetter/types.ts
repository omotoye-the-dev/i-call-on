export type TimeSetterFormat = 'time' | 'number'

export interface TimeSetterProps {
  value: number
  onChange: (newValue: number) => void
  min?: number
  max?: number
  step?: number
  format?: TimeSetterFormat
  formatValue?: (val: number) => string
  label?: string
  disabled?: boolean
  className?: string
  id?: string
}
