import type { ReactNode } from 'react'

export interface NavbarProps {
  /**
   * Title or brand logo text displayed on the left.
   * @default 'I Call On'
   */
  brandText?: string

  /**
   * Action link/button label displayed on the right.
   * @default 'create account'
   */
  actionText?: string

  /**
   * Optional click handler for the action text.
   */
  onActionClick?: () => void

  /**
   * Visual border style for the container:
   * - 'full': 2px border on all sides (matches framed component mockup)
   * - 'bottom': 2px border on bottom edge only (standard page header)
   * - 'none': no border
   * @default 'full'
   */
  borderStyle?: 'full' | 'bottom' | 'none'

  /**
   * Optional custom slot for right side content if overriding default actionText
   */
  children?: ReactNode

  /**
   * Additional Tailwind or CSS classes to append.
   */
  className?: string
}
