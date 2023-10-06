import { datasetClient } from '@/lib/dataset-client'
import { gridRecipe } from '@supeffective/ui'
import { Button } from '../ui/button'
import { PokeImg } from './images'

export default async function PokeList() {
  const pokemon = await datasetClient.pokemon.getAll()

  return (
    <>
      Num of pokemon: {pokemon.length}
      <form>
        <input type="text" />
        <Button>Search</Button>
      </form>
      <div className={gridRecipe({ className: 'gap-2 sm:gap-3', size: 'lg', autoFill: true })}>
        {pokemon
          .filter((p) => !p.isForm)
          .map((p) => (
            <div key={p.id} title={p.name} className="text-center flex flex-col gap-2">
              <PokeImg assetId={p.nid} />
              <div className="font-mono text-xs text-muted-foreground">#{String(p.dexNum).padStart(4, '0')}</div>
            </div>
          ))}
      </div>
    </>
  )
}
