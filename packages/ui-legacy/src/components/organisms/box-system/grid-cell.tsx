import { cn } from '@r1stack/cn'
import { useEffect, useState } from 'react'

import { PokeImgFile, TypeIcon } from '@/components/molecules'

import type { PokeTypeId } from '@supeffective/dataset'
import classes from './styles/grid-cell.styles'
import type { LivingDexGridCellProps } from './types/grid-cell.types'

export default function Cell({
  uid,
  position,
  pokemon,
  state: initialState,
  displayOptions: opt,
  className,
  ...rest
}: LivingDexGridCellProps) {
  const [state, setState] = useState(
    initialState ?? {
      caught: false,
      shiny: false,
    },
  )

  useEffect(() => {
    if (initialState) {
      setState(initialState)
      console.log('cell state updated', initialState)
    }
  }, [initialState])

  const cssClass = cn(classes.cell, className, 'livingdex-grid-cell')

  if (!pokemon) {
    return (
      <div className={cssClass} {...rest}>
        <span className={classes.placeholder}>???</span>
      </div>
    )
  }
  const poke = pokemon
  const isMaleVariant = poke.hasGenderDifferences && !poke.isFemaleForm
  const isFemaleVariant = poke.isFemaleForm
  const shortName = poke.name.replace(/[()]/g, '').trim()
  const isShiny = state.shiny === true

  // console.log('cell state', state)

  return (
    <div
      className={opt.view === 'unified' ? '' : cssClass}
      {...rest}
      title={poke.name}
      data-uid={uid}
      data-box={position[0]}
      data-cell={position[1]}
      data-state-shiny={isShiny}
      data-state-caught={state.caught}
    >
      {opt.sprites && <PokeImgFile className={classes.sprite} assetId={poke.nid} shiny={isShiny} />}
      {opt.types && (
        <div className={classes.infoTypes}>
          {poke.type1 && <TypeIcon typeId={poke.type1 as PokeTypeId} colored size="xs" />}
          {poke.type2 && <TypeIcon typeId={poke.type2 as PokeTypeId} colored size="xs" />}
        </div>
      )}
      {opt.numbers && <div className={classes.infoText}>#{String(poke.dexNum).padStart(4, '0')}</div>}
      {opt.names && (
        <div className={classes.infoText}>
          {shortName.replace(/[♂♀]/g, ' ').replace(/\s+female/gi, '')}
          {isMaleVariant && <span className={classes.maleIcon}> ♂</span>}
          {isFemaleVariant && <span className={classes.femaleIcon}> ♀</span>}
        </div>
      )}
    </div>
  )
}
