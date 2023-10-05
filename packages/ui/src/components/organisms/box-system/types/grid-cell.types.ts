import type { HTMLProps } from 'react'

import type { ResolvedLivingDexBoxCell } from '@supeffective/dextracker'

import type { LivingDexGridBoxDisplayOptions } from './grid-box.types'

export type LivingDexGridCellProps = {
  displayOptions: LivingDexGridBoxDisplayOptions
  disabled?: boolean
} & ResolvedLivingDexBoxCell &
  HTMLProps<HTMLDivElement>
