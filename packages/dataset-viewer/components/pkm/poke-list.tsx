'use client'

import { Pokemon } from '@supeffective/dataset'
import { gridRecipe } from '@supeffective/ui'
import { ArrowLeftRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FormsToggler } from './forms-toggler'
import { GenerationSelector } from './gen-selector'
import { PokeImg } from './images'

export default function PokeList({ pokemon }: { pokemon: Pokemon[] }) {
  const search = useSearchParams()
  const gen = Number(search.get('gen')) || 1
  const showForms = search.get('forms') === '1'
  const genPkm = pokemon.filter((p) => p.generation === gen)
  const pkmUntilThisGen = pokemon.filter((p) => p.generation <= gen)
  const species = genPkm.filter((p) => !p.isForm)
  const forms = genPkm.filter((p) => p.isForm)
  const searchStr = search.size > 0 ? `?${search.toString()}` : ''

  function _renderGrid() {
    if (genPkm.length === 0) {
      return (
        <div className="flex flex-col gap-2 items-center border-dashed justify-center rounded-md border my-6 p-4">
          <div className="text-center text-sm italic text-muted-foreground">No results</div>
        </div>
      )
    }

    return (
      <div
        className={gridRecipe({ className: 'gap-3 sm:gap-4 rounded-md border my-6 p-4', size: 'lg', autoFill: true })}
      >
        {genPkm
          .filter((p) => (showForms ? true : !p.isForm))
          .map((p) => (
            <div key={p.id} title={p.name} className="text-center flex flex-col gap-2">
              <Link href={`/pokemon/${p.id}${searchStr}`}>
                <PokeImg assetId={p.nid} />
              </Link>
              <div className="font-mono text-xs text-muted-foreground">#{String(p.dexNum).padStart(4, '0')}</div>
              <div className="font-mono text-xs text-muted-foreground hyphens-auto">{p.name}</div>
            </div>
          ))}
      </div>
    )
  }

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
    <div className="container p-5">
      <h1 className="text-4xl font-extrabold tracking-tighter">Pokémon</h1>
      <div className="text-2xl font-semibold mb-2 flex gap-3">
        Generation {gen}{' '}
        <GenerationSelector className="align-middle">
          <ArrowLeftRightIcon size={16} />
        </GenerationSelector>
      </div>
      {_renderDesc()}
      <div className="py-6">
        <FormsToggler className="align-middle" />
      </div>
      {_renderGrid()}
    </div>
  )
}
