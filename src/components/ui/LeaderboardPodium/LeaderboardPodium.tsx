import type { JSX } from 'react'
import { clsx } from 'clsx'
import { Crown } from 'lucide-react'
import type { LeaderboardPodiumProps } from './types.ts'

export function LeaderboardPodium({
  topPlayers,
  showScores = true,
  className = '',
  onPlayerClick,
}: LeaderboardPodiumProps): JSX.Element {
  const first = topPlayers[0]
  const second = topPlayers[1]
  const third = topPlayers[2]

  return (
    <div
      className={clsx(
        'flex items-end justify-center gap-2 sm:gap-4 font-display select-none pt-8 pb-2',
        className,
      )}
    >
      {/* 2nd Place Bar (Left) */}
      <div
        onClick={() => second && onPlayerClick?.(second)}
        className={clsx(
          'w-24 sm:w-28 flex flex-col items-center justify-end transition-transform hover:-translate-y-1',
          second && onPlayerClick && 'cursor-pointer',
        )}
      >
        <div className="w-full h-36 sm:h-44 bg-surface-disabled border-3 border-game-dark rounded-t-2xl p-3 flex flex-col items-center justify-between shadow-tactile-4">
          <span className="text-3xl sm:text-4xl font-extrabold text-game-text leading-none pt-1">
            2
          </span>
          <div className="text-center w-full px-1 pb-1">
            <p className="font-bold text-sm sm:text-base text-game-text truncate">
              {second?.name ?? 'Empty'}
            </p>
            {showScores && second && (
              <p className="text-xs font-medium text-game-muted">{second.score} pts</p>
            )}
          </div>
        </div>
      </div>

      {/* 1st Place Bar (Center, Tallest) */}
      <div
        onClick={() => first && onPlayerClick?.(first)}
        className={clsx(
          'relative w-28 sm:w-34 flex flex-col items-center justify-end z-10 transition-transform hover:-translate-y-1.5',
          first && onPlayerClick && 'cursor-pointer',
        )}
      >
        {/* Floating Crown Badge */}
        <div className="absolute -top-6 flex items-center justify-center animate-bounce duration-1000">
          <div className="p-1.5 bg-banner border-2 border-game-dark rounded-full shadow-tactile-2">
            <Crown className="w-5 h-5 text-warning fill-warning" />
          </div>
        </div>

        <div className="w-full h-48 sm:h-56 bg-game-primary border-3 border-game-dark rounded-t-2xl p-3 flex flex-col items-center justify-between shadow-tactile-6">
          <span className="text-4xl sm:text-5xl font-extrabold text-white leading-none pt-2 drop-shadow-sm">
            1
          </span>
          <div className="text-center w-full px-1 pb-1 text-white">
            <p className="font-extrabold text-base sm:text-lg truncate drop-shadow-sm">
              {first?.name ?? 'Winner'}
            </p>
            {showScores && first && (
              <p className="text-xs font-semibold text-white/90">{first.score} pts</p>
            )}
          </div>
        </div>
      </div>

      {/* 3rd Place Bar (Right) */}
      <div
        onClick={() => third && onPlayerClick?.(third)}
        className={clsx(
          'w-24 sm:w-28 flex flex-col items-center justify-end transition-transform hover:-translate-y-1',
          third && onPlayerClick && 'cursor-pointer',
        )}
      >
        <div className="w-full h-28 sm:h-34 bg-white border-3 border-game-dark rounded-t-2xl p-3 flex flex-col items-center justify-between shadow-tactile-4">
          <span className="text-3xl sm:text-4xl font-extrabold text-game-text leading-none pt-1">
            3
          </span>
          <div className="text-center w-full px-1 pb-1">
            <p className="font-bold text-sm sm:text-base text-game-text truncate">
              {third?.name ?? 'Empty'}
            </p>
            {showScores && third && (
              <p className="text-xs font-medium text-game-muted">{third.score} pts</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
