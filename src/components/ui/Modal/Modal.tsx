import { useEffect, useId } from 'react'
import type { JSX } from 'react'
import { clsx } from 'clsx'
import { X } from 'lucide-react'
import type { ModalProps } from './types.ts'

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEsc = true,
}: ModalProps): JSX.Element | null {
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose?.()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, closeOnEsc, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  }[size]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descId : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
        onClick={closeOnBackdropClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className={clsx(
          'relative w-full bg-white text-game-text rounded-3xl border-3 border-game-dark shadow-modal p-6 sm:p-8 flex flex-col items-center text-center font-display z-10 animate-in fade-in zoom-in-95 duration-150',
          sizeClasses,
        )}
      >
        {showCloseButton && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-1.5 rounded-full text-game-muted hover:text-game-text hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {title && (
          <h2
            id={titleId}
            className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-game-text mb-2"
          >
            {title}
          </h2>
        )}

        {description && (
          <p id={descId} className="text-sm font-medium text-game-muted mb-4">
            {description}
          </p>
        )}

        {children && <div className="w-full my-3 flex flex-col items-center">{children}</div>}

        {footer && <div className="w-full mt-4 flex items-center justify-center gap-3">{footer}</div>}
      </div>
    </div>
  )
}
