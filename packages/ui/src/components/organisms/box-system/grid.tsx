import { cn } from '@r1stack/cn'
import { HTMLProps } from 'react'

import { Pokemon } from '@supeffective/dataset'
import { LivingDex, LivingDexBox } from '@supeffective/dextracker'

import Box from './grid-box'
import UnifiedBox from './grid-box-unified'
import classes from './styles/grid.styles'
import { LivingDexGridBoxDisplayOptions, LivingDexGridCellPressFn } from './types/grid-box.types'

export type LivingDexGridProps = {
  livingdex: LivingDex
  pokedex?: Pokemon[]
  displayOptions?: Partial<LivingDexGridBoxDisplayOptions>
  onCellPress?: LivingDexGridCellPressFn
  onCellLongPress?: LivingDexGridCellPressFn
} & HTMLProps<HTMLDivElement>

export function LivingDexGrid({
  livingdex,
  displayOptions,
  onCellPress,
  onCellLongPress,
  pokedex = [],
  className,
  ...rest
}: LivingDexGridProps) {
  const grids = []

  if (displayOptions?.view === 'unified') {
    const allBoxPokes = new Map(
      Array.from(livingdex.boxes.values())
        .flatMap((b) => Array.from(b.pokemon.values()))
        .map((p, i) => [i, p]),
    )

    const box: LivingDexBox = { position: 0, pokemon: allBoxPokes }

    grids.push(
      <UnifiedBox
        box={box}
        key={`box-${box.position}`}
        pokedex={pokedex}
        cells={Array.from(box.pokemon.values())}
        onCellPress={onCellPress}
        onCellLongPress={onCellLongPress}
        displayOptions={{
          sprites: true,
          types: false,
          numbers: false,
          names: false,
          uncaught: false,
          indicators: false,
          view: 'unified',
          ...displayOptions,
        }}
      />,
    )
  } else {
    for (const box of livingdex.boxes.values()) {
      grids.push(
        <Box
          box={box}
          key={`box-${box.position}`}
          pokedex={pokedex}
          cells={Array.from(box.pokemon.values())}
          onCellPress={onCellPress}
          onCellLongPress={onCellLongPress}
          displayOptions={{
            sprites: true,
            types: false,
            numbers: false,
            names: false,
            uncaught: false,
            indicators: false,
            view: 'grid',
            ...displayOptions,
          }}
        />,
      )
    }
  }

  return (
    <div
      className={cn(classes.multiBoxGrid, className, 'livingdex-grid')}
      data-view-mode={displayOptions?.view ?? 'grid'}
      {...rest}
    >
      {grids}
    </div>
  )
}

LivingDexGrid.Box = Box
LivingDexGrid.Cell = Box.Cell
