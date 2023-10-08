import { Pokemon } from '@supeffective/dataset'
import { gridRecipe } from '@supeffective/ui'
import { StatefulLink } from '../ui/stateful-link'
import { PokeImg } from './images'

export default function PokeGrid({
  pokemon,
  filters: _filters,
  withCounters,
}: {
  pokemon: Pokemon[]
  withCounters?: boolean
  filters?: {
    isForm?: boolean
    obtainableIn?: string
    storableIn?: string
    notStorableIn?: string
    eventOnlyIn?: string
    transferOnlyIn?: string
  }
}) {
  const filters = Object.assign(
    {
      isForm: true,
    },
    _filters,
  )

  const filtered = pokemon
    .filter((p) => (filters.isForm ? true : !p.isForm))
    .filter((p) => {
      let included = true

      if (filters.obtainableIn) {
        included = included && p.obtainableIn.includes(filters.obtainableIn)
      }

      if (filters.storableIn) {
        included = included && p.storableIn.includes(filters.storableIn)
      }

      if (filters.eventOnlyIn) {
        included = included && p.eventOnlyIn.includes(filters.eventOnlyIn)
      }

      if (filters.transferOnlyIn) {
        included =
          included && p.storableIn.includes(filters.transferOnlyIn) && !p.obtainableIn.includes(filters.transferOnlyIn)
      }

      if (filters.notStorableIn) {
        included =
          included &&
          (p.eventOnlyIn.includes(filters.notStorableIn) || p.obtainableIn.includes(filters.notStorableIn)) &&
          !p.storableIn.includes(filters.notStorableIn)
      }

      return included
    })

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col gap-2 items-center border-dashed justify-center rounded-md border my-6 p-4">
        <div className="text-center text-sm italic text-muted-foreground">No results</div>
      </div>
    )
  }

  function _renderCounters() {
    if (!withCounters) {
      return null
    }

    const species = filtered.filter((p) => !p.isForm)
    const forms = filtered.filter((p) => p.isForm)

    return (
      <div className="text-sm text-muted-foreground">
        <span className="font-bold">{species.length}</span> species and{' '}
        <span className="font-bold">{forms.length || 'no'}</span> forms (
        <span className="font-bold">{filtered.length}</span> in total)
      </div>
    )
  }

  return (
    <>
      {_renderCounters()}
      <div
        className={gridRecipe({
          className: 'gap-3 sm:gap-4 rounded-md border my-6 p-4 max-h-[440px] overflow-auto',
          size: 'lg',
          autoFill: true,
        })}
      >
        {filtered.map((p) => (
          <div key={p.id} title={p.name} className="text-center flex flex-col gap-2">
            <StatefulLink href={`/pokemon/${p.id}`}>
              <PokeImg assetId={p.nid} />
            </StatefulLink>
            <div className="font-mono text-xs text-muted-foreground">#{String(p.dexNum).padStart(4, '0')}</div>
            <div className="font-mono text-xs text-muted-foreground hyphens-auto">{p.name}</div>
          </div>
        ))}
      </div>
    </>
  )
}
