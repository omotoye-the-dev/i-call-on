export interface LeaderboardPlayer {
  id: string
  name: string
  score: number
  rank?: number
  isCurrentPlayer?: boolean
  avatarUrl?: string
}

export interface LeaderboardPodiumProps {
  topPlayers: [LeaderboardPlayer?, LeaderboardPlayer?, LeaderboardPlayer?]
  showScores?: boolean
  className?: string
  onPlayerClick?: (player: LeaderboardPlayer) => void
}

export interface LeaderboardListProps {
  players: LeaderboardPlayer[]
  title?: string
  className?: string
  onPlayerClick?: (player: LeaderboardPlayer) => void
}
