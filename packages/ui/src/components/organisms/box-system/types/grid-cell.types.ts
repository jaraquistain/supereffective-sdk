import { HTMLProps } from 'react'

import { ResolvedLivingDexBoxCell } from '@supeffective/dextracker'

import { LivingDexGridBoxDisplayOptions } from './grid-box.types'

export type LivingDexGridCellProps = {
  displayOptions: LivingDexGridBoxDisplayOptions
  disabled?: boolean
} & ResolvedLivingDexBoxCell &
  HTMLProps<HTMLDivElement>
