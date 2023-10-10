import type { ResolvedLivingDexBoxCell } from '@supeffective/dextracker'

import type { PokeImgFileProps } from '@/components/molecules'

import { Box, type BoxProps } from './Box'
import { PokeAvatarCard, type PokeAvatarCardDisplayOptions } from './PokeAvatarCard'

export type PokeBoxProps = Omit<BoxProps<ResolvedLivingDexBoxCell>, 'cellRenderer'> & {
  displayOptions?: PokeAvatarCardDisplayOptions
  onCellClick?: (cell: ResolvedLivingDexBoxCell) => void
  onCellLongPress?: (cell: ResolvedLivingDexBoxCell) => void
  artStyle?: PokeImgFileProps['variant']
}

const cellRenderer = (
  cell: ResolvedLivingDexBoxCell,
  displayOptions?: PokeAvatarCardDisplayOptions,
  artStyle?: PokeImgFileProps['variant'],
) => {
  return (
    <PokeAvatarCard
      key={cell.uid}
      size="full"
      variant={artStyle}
      shiny={cell.state?.shiny}
      displayOptions={displayOptions}
      pokemon={cell.pokemon}
    />
  )
}

export function PokeBox(props: PokeBoxProps): JSX.Element {
  const { displayOptions, artStyle, onCellClick: _onCellClick, onCellLongPress: _onCellLongPress, ...rest } = props

  return <Box cellRenderer={(cell) => cellRenderer(cell, displayOptions, artStyle)} {...rest} />
}
