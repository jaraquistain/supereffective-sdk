import { pokemonGames } from '@supeffective/dataset'
import GameGrid from './game-grid'
import { GameListProps } from './types'

const games = pokemonGames

export default function GameListBody({ query }: GameListProps) {
  const individualGames = games.filter((game) => game.type === 'game')
  const gameSets = games.filter((game) => game.type === 'set' || (game.type === 'game' && !game.gameSet))
  const dlcs = games.filter((game) => game.type === 'dlc')

  return (
    <>
      <div className="text-2xl font-semibold mb-2 flex gap-3">Sets</div>
      <GameGrid games={gameSets} query={query} />
      <div className="text-2xl font-semibold mb-2 flex gap-3">Versions</div>
      <GameGrid games={individualGames} query={query} />
      <div className="text-2xl font-semibold mb-2 flex gap-3">DLCs</div>
      <GameGrid games={dlcs} query={query} />
    </>
  )
}
