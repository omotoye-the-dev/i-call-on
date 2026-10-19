import type { HTMLAttributes, ReactNode } from 'react'

export type CardVariant = 'default' | 'primary' | 'muted' | 'banner'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: CardVariant
  title?: string
  subtitle?: string
  headerAction?: ReactNode
  footer?: ReactNode
}
