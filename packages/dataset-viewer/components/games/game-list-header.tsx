import EditSourceLink from '../ui/edit-on-github'
import { GameListProps } from './types'

export default function GameListHeader(_props: GameListProps) {
  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tighter">
        Games <EditSourceLink className="inline-flex align-middle ml-2" file="packages/dataset/data/games.json" />
      </h1>
      <p className="pt-1 pb-5 text-lg text-muted-foreground">
        List of all game sets, games, and DLCs where Pokémon can be collected and tranferred from/to.
      </p>
    </>
  )
}
