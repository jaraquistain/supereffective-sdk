import { datasetClient } from '@/lib/dataset-client'
import { FormsToggler } from './forms-toggler'
import PokeGrid from './poke-grid'
import PokeTable from './poke-table'
import { RegionSelector } from './region-selector'
import { TableToggler } from './table-toggler'
import { PokeListProps } from './types'

export default async function PokeListBody({ region, showForms, asTable = false }: PokeListProps) {
  const allPokemon = await datasetClient.pokemon.getAll()
  const scopedPokemon = allPokemon.filter((p) => p.region === region)
  const species = scopedPokemon.filter((p) => !p.isForm)
  const forms = scopedPokemon.filter((p) => p.isForm)

  function _renderDesc() {
    if (scopedPokemon.length === 0) {
      return null
    }

    return (
      <p className="text-lg text-muted-foreground">
        In this region have been discovered <span className="font-bold">{species.length}</span> species and{' '}
        <span className="font-bold">{forms.length ? forms.length : 'no'}</span> forms, for a total of{' '}
        <span className="font-extrabold underline">{scopedPokemon.length}</span> new Pokémon.
      </p>
    )
  }

  function _renderGrid() {
    if (asTable) {
      return (
        <PokeTable
          pokemon={scopedPokemon}
          filters={{
            isForm: showForms,
          }}
        />
      )
    }

    return (
      <PokeGrid
        pokemon={scopedPokemon}
        withDexNums
        withNames
        filters={{
          isForm: showForms,
        }}
      />
    )
  }

  return (
    <>
      {_renderDesc()}
      <div className="py-6 flex gap-4">
        <RegionSelector className="align-middle inline-flex" />
        <FormsToggler className="align-middle inline-flex" />
        <TableToggler className="align-middle inline-flex" />
      </div>
      {_renderGrid()}
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-bold">{showForms ? scopedPokemon.length : species.length}</span> of{' '}
        <span className="font-bold">{allPokemon.length}</span> Pokémon
      </p>
    </>
  )
}
