import type { JSX } from 'react'
import { clsx } from 'clsx'
import type { LeaderboardListProps } from './types.ts'

export function LeaderboardList({
  players,
  title,
  className = '',
  onPlayerClick,
}: LeaderboardListProps): JSX.Element {
  return (
    <div
      className={clsx(
        'w-full bg-white border-3 border-game-dark rounded-3xl p-5 sm:p-6 shadow-tactile-6 font-display',
        className,
      )}
    >
      {title && (
        <h3 className="text-xl font-extrabold text-game-text mb-4 text-left border-b-2 border-divider pb-2">
          {title}
        </h3>
      )}

      <ul className="flex flex-col divide-y-2 divide-divider">
        {players.map((player, index) => {
          const rankNumber = player.rank ?? index + 1
          const isTopThree = rankNumber <= 3

          return (
            <li
              key={player.id}
              onClick={() => onPlayerClick?.(player)}
              className={clsx(
                'py-3 px-2 flex items-center justify-between transition-colors rounded-xl',
                onPlayerClick && 'cursor-pointer hover:bg-canvas',
                player.isCurrentPlayer && 'bg-banner/60',
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={clsx(
                    'text-base sm:text-lg font-extrabold w-6 text-left',
                    rankNumber === 1
                      ? 'text-game-primary'
                      : isTopThree
                        ? 'text-game-text'
                        : 'text-game-muted',
                  )}
                >
                  {rankNumber}.
                </span>
                <span className="text-base sm:text-lg font-bold text-game-text truncate">
                  {player.name}
                </span>
                {player.isCurrentPlayer && (
                  <span className="text-tiny uppercase tracking-wider font-extrabold bg-game-primary text-white px-2 py-0.5 rounded-full ml-1">
                    You
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <span className="text-sm sm:text-base font-extrabold text-game-text">
                  {player.score}
                </span>
                <span className="text-xs font-semibold text-game-muted">pts</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
