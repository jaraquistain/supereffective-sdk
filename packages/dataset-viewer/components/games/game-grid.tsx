import { Game } from '@supeffective/dataset'
import { gridRecipe } from '@supeffective/ui'
import Link from 'next/link'
import { GameAvatarImg } from '../pkm/images'

export default function GameGrid({ games, query }: { games: Game[]; query: string }) {
  if (games.length === 0) {
    return (
      <div className="flex flex-col gap-2 items-center border-dashed justify-center rounded-md border my-6 p-4">
        <div className="text-center text-sm italic text-muted-foreground">No results</div>
      </div>
    )
  }

  return (
    <div className={gridRecipe({ className: 'gap-3 sm:gap-4 rounded-md border my-6 p-4', size: 'lg', autoFill: true })}>
      {games.map((row) => (
        <div key={row.id} title={row.name} className="text-center flex flex-col gap-2">
          <Link href={`/games/${row.id}${query}`}>
            <GameAvatarImg assetId={row.id} />
          </Link>
          <div className="font-mono text-xs text-muted-foreground hyphens-auto">Pokémon {row.name}</div>
        </div>
      ))}
    </div>
  )
}
