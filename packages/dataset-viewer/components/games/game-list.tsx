import GameListBody from './game-list-body'
import GameListHeader from './game-list-header'
import { GameListProps } from './types'

export default function GameList(props: GameListProps) {
  return (
    <div className="container p-1 sm:p-5">
      <GameListHeader {...props} />
      <GameListBody {...props} />
    </div>
  )
}
