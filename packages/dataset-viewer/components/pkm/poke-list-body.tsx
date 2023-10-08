import { datasetClient } from '@/lib/dataset-client'
import { FormsToggler } from './forms-toggler'
import PokeGrid from './poke-grid'
import { PokeListProps } from './types'

export default async function PokeListBody({ gen: genStr, showForms, query }: PokeListProps) {
  const gen = Number(genStr)
  const pokemon = await datasetClient.pokemon.getAll()
  const genPkm = pokemon.filter((p) => p.generation === gen)
  const pkmUntilThisGen = pokemon.filter((p) => p.generation <= gen)
  const species = genPkm.filter((p) => !p.isForm)
  const forms = genPkm.filter((p) => p.isForm)

  function _renderDesc() {
    if (genPkm.length === 0) {
      return null
    }

    return (
      <p className="text-lg text-muted-foreground">
        This generation introduced <span className="font-bold">{species.length}</span> species and{' '}
        <span className="font-bold">{forms.length ? forms.length : 'no'}</span> forms, for a total of{' '}
        <span className="font-extrabold underline">{genPkm.length}</span> new Pokémon.
        <br />
        {gen > 1 && (
          <>
            Together with previous generations, there is a total of{' '}
            <span className="font-bold">{pkmUntilThisGen.length}</span> Pokémon.
          </>
        )}
      </p>
    )
  }

  return (
    <>
      {_renderDesc()}
      <div className="py-6">
        <FormsToggler className="align-middle" />
      </div>
      <PokeGrid
        pokemon={genPkm}
        query={query}
        filters={{
          isForm: showForms,
        }}
      />
    </>
  )
}
