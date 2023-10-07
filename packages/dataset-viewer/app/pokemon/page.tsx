import PokeList from '@/components/pkm/poke-list'
import { datasetClient } from '@/lib/dataset-client'

export default async function Page() {
  const pokemon = await datasetClient.pokemon.getAll()
  return (
    <>
      <PokeList pokemon={pokemon} />
    </>
  )
}
