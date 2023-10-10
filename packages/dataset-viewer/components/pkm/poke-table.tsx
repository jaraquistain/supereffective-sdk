import { PokeTypeId, Pokemon } from '@supeffective/dataset'
import { TypeIcon } from '../icons/type-icon'
import { StatefulLink } from '../ui/stateful-link'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { GameAvatarImg, PokeImg } from './images'

function PokeRow({ pokemon: p }: { pokemon: Pokemon | null }) {
  if (!p) {
    return (
      <div className="text-center pointer-events-none flex flex-col gap-2">
        <PokeImg assetId={'0000-unknown'} />
      </div>
    )
  }
  return (
    <TableRow>
      <TableCell className="font-medium w-[100px]">
        <StatefulLink href={`/pokemon/${p.id}`}>
          <PokeImg assetId={p.nid} title={p.name} className={'w-16 h-16'} />
        </StatefulLink>
      </TableCell>
      <TableCell className="font-mono text-xs text-muted-foreground">#{String(p.dexNum).padStart(4, '0')}</TableCell>
      <TableCell className="font-mono text-xs text-muted-foreground">{p.name}</TableCell>
      <TableCell>
        <div className="dex-tracker-ui flex gap-2">
          <TypeIcon typeId={p.type1 as PokeTypeId} />
          {p.type2 && <TypeIcon typeId={p.type2 as PokeTypeId} />}
        </div>
      </TableCell>
      <TableCell className="text-left">
        <div className="flex flex-wrap gap-1">
          {p.obtainableIn.map((g) => {
            return (
              <StatefulLink key={g} href={`/games/${g}`} className="">
                <GameAvatarImg
                  title={g.toUpperCase()}
                  className={'w-10 h-10 opacity-90 hover:opacity-100 hover:scale-[2] hover:z-[1] transition-all'}
                  assetId={g}
                />
              </StatefulLink>
            )
          })}
        </div>
      </TableCell>
    </TableRow>
  )
}

export default function PokeTable({
  pokemon,
  filters: _filters,
  withCounters,
  className,
}: {
  className?: string
  pokemon: Array<Pokemon | null>
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
    .filter((p) => {
      if (!p) {
        return true
      }
      if (filters.isForm) {
        return true
      }
      return !p.isForm
    })
    .filter((p) => {
      let included = true
      if (!p) {
        return true
      }

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

    const species = filtered.filter((p) => p && !p.isForm)
    const forms = filtered.filter((p) => p?.isForm)

    return (
      <TableCaption>
        <div className="text-sm text-muted-foreground">
          <span className="font-bold">{species.length}</span> species and{' '}
          <span className="font-bold">{forms.length || 'no'}</span> forms (
          <span className="font-bold">{filtered.length}</span> in total)
        </div>
      </TableCaption>
    )
  }

  return (
    <>
      <Table className={className}>
        {_renderCounters()}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sprite</TableHead>
            <TableHead>Dex No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Types</TableHead>
            <TableHead className="text-left">Game Availability</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((p, idx) => {
            const key = p ? p.id : `placeholder-${idx}`
            return <PokeRow key={key} pokemon={p} />
          })}
        </TableBody>
      </Table>
    </>
  )
}
