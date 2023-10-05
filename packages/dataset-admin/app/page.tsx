import { PokeImg } from '@/components/pkm/poke-img'
import { datasetClient } from '@/lib/dataset-client'

export default async function Home() {
  const pokemon = await datasetClient.pokemonIndex.getAll()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      Num of pokemon: {pokemon.length}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
        {pokemon
          .filter((p) => !p.isForm)
          .map((p) => (
            <div key={p.id} title={p.name}>
              <PokeImg assetId={p.nid} />
              {/* {p.name} */}
            </div>
          ))}
      </div>
    </main>
  )
}
