import { pokemonGames } from '@supeffective/dataset'
import GameGrid from './game-grid'

const games = pokemonGames

export default function GameListBody() {
  const individualGames = games.filter((game) => game.type === 'game')
  const gameSets = games.filter((game) => game.type === 'set' || (game.type === 'game' && !game.gameSet))
  const dlcs = games.filter((game) => game.type === 'dlc')

  return (
    <>
      <div className="text-2xl font-semibold mb-2 text-muted-foreground flex gap-3">Game Sets</div>
      <GameGrid games={gameSets} />
      <div className="text-2xl font-semibold mb-2 text-muted-foreground flex gap-3">Game Versions</div>
      <GameGrid games={individualGames} />
      <div className="text-2xl font-semibold mb-2 text-muted-foreground flex gap-3">DLCs</div>
      <GameGrid games={dlcs} />
    </>
  )
}
