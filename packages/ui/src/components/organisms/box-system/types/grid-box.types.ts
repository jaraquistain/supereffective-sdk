import { HTMLProps } from 'react'

import { Pokemon } from '@supeffective/dataset'
import {
  LivingDexBox,
  LivingDexBoxCell,
  ResolvedLivingDexBoxCell,
  UpdateLivingDexBoxCell,
} from '@supeffective/dextracker'

export type LivingDexGridBoxDisplayOptions = {
  sprites: boolean
  types: boolean
  numbers: boolean
  names: boolean
  uncaught: boolean
  indicators: boolean
  view: 'grid' | 'unified'
}

export type LivingDexGridBoxProps = {
  pokedex: Pokemon[]
  box: LivingDexBox
  cells: LivingDexBoxCell[]
  onCellPress?: LivingDexGridCellPressFn
  onCellLongPress?: LivingDexGridCellPressFn
  displayOptions: LivingDexGridBoxDisplayOptions
} & HTMLProps<HTMLDivElement>

export type LivingDexGridCellPressFn = (
  cell: ResolvedLivingDexBoxCell,
  cellUpdate: LivingDexBox,
  updateCell: (cell: ResolvedLivingDexBoxCell, state: UpdateLivingDexBoxCell) => void,
) => void
