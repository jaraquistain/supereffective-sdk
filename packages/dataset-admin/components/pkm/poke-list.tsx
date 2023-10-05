'use client'

import { PokeImg } from '@/components/pkm/poke-img'
import { datasetClient } from '@/lib/dataset-client'
import { FullGrid } from '@supeffective/ui'

export default async function PokeList() {
  const pokemon = await datasetClient.pokemon.getAll()

  return (
    <>
      Num of pokemon: {pokemon.length}
      <FullGrid className="gap-2 sm:gap-4">
        {pokemon
          .filter((p) => !p.isForm)
          .map((p) => (
            <div key={p.id} title={p.name} className="text-center flex flex-col gap-2">
              <PokeImg assetId={p.nid} />
              <div className="font-mono text-xs text-muted-foreground">#{String(p.dexNum).padStart(4, '0')}</div>
            </div>
          ))}
      </FullGrid>
    </>
  )
}
