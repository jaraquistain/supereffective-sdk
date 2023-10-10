import { Game } from '@supeffective/dataset'
import { GridFull } from '../layout/grids'
import { GameAvatarImg } from '../pkm/images'
import { StatefulLink } from '../ui/stateful-link'

export default function GameGrid({ games }: { games: Game[] }) {
  if (games.length === 0) {
    return (
      <div className="flex flex-col gap-2 items-center border-dashed justify-center rounded-md border my-6 p-4">
        <div className="text-center text-sm italic text-muted-foreground">No results</div>
      </div>
    )
  }

  return (
    <GridFull size="lg">
      {games.map((row) => (
        <div key={row.id} title={row.name} className="text-center flex flex-col gap-2">
          <StatefulLink href={`/games/${row.id}`}>
            <GameAvatarImg assetId={row.id} />
          </StatefulLink>
          <div className="font-mono text-xs text-muted-foreground hyphens-auto">Pokémon {row.name}</div>
        </div>
      ))}
    </GridFull>
  )
}
