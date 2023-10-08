import { datasetClient } from '@/lib/dataset-client'
import { Pokedex, Pokemon } from '@supeffective/dataset'
import PokeGrid from '../pkm/poke-grid'

export default async function PokedexEntries({
  dex,
  query,
  withForms = true,
}: {
  dex: Pokedex
  query: string
  withForms?: boolean
}) {
  const pokemon = await datasetClient.pokemon.getAll()
  const pokemonMap = new Map(pokemon.map((row) => [row.id, row]))
  const entries: Pokemon[] = dex.entries
    .filter((row) => (withForms ? true : !row.isForm))
    .map((row) => {
      const pokemon = pokemonMap.get(row.id)
      if (!pokemon) {
        return undefined
      }
      pokemon.dexNum = row.dexNum ?? 0
      return pokemon
    })
    .filter((row): row is Pokemon => row !== undefined)

  return (
    <div className="w-full">
      <PokeGrid
        pokemon={entries}
        query={query}
        withCounters
        filters={{
          isForm: true,
        }}
      />
    </div>
  )
}
