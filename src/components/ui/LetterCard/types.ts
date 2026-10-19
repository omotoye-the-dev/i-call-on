import type { ButtonHTMLAttributes } from 'react'

export type LetterCardVariant = 'grid' | 'category' | 'display'
export type LetterCardState = 'default' | 'selected' | 'used' | 'disabled'
export type CategoryColor = 'name' | 'place' | 'animal' | 'things' | 'custom'

export interface LetterCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  letter: string
  label?: string
  variant?: LetterCardVariant
  state?: LetterCardState
  categoryColor?: CategoryColor
  customBgColor?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  tilt?: 'none' | 'left-subtle' | 'right-subtle' | 'left-strong' | 'right-strong'
  onSelectLetter?: (letter: string) => void
}
