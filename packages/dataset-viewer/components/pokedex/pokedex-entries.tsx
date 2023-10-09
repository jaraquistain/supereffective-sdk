import { datasetClient } from '@/lib/dataset-client'
import { Pokedex, Pokemon } from '@supeffective/dataset'
import PokeGrid from '../pkm/poke-grid'
import { Button } from '../ui/button'
import EditSourceLink from '../ui/edit-on-github'

export default async function PokedexEntries({
  dex,
  withForms = true,
}: {
  dex: Pokedex
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

  const srcFile = dex.region
    ? `packages/dataset/data/pokedexes/${dex.region}/${dex.id}.json`
    : `packages/dataset/data/pokedexes/${dex.id}.json`

  return (
    <div className="w-full">
      <PokeGrid
        className="max-h-[65vh]"
        pokemon={entries}
        withCounters
        filters={{
          isForm: true,
        }}
      />
      <Button asChild>
        <EditSourceLink className="my-3" file={srcFile}>
          Edit on Github
        </EditSourceLink>
      </Button>
    </div>
  )
}
