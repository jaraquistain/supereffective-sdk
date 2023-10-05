import type { CSSProperties } from 'react'

import type { Story } from '@storylite/storylite'
import { pokemonGames } from '@supeffective/dataset'
import { GameLabel } from '@supeffective/ui'

export default {
  title: 'Game Labels',
  component: GameLabel,
  decorators: [
    (Story: any) => (
      <div className="dex-tracker-ui" style={{ padding: '16px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Story<any>

const gridStyles: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  // gridTemplateColumns: 'repeat(auto-fill, minmax(24px, 1fr))',
  gap: '1rem',
  alignItems: 'flex-end',
}

export const Defaults = () => (
  <div style={gridStyles}>{pokemonGames.flatMap((row) => [<GameLabel key={row.id} gameId={row.id} />])}</div>
)
export const AllSizes = () => (
  <div style={gridStyles}>
    {pokemonGames.flatMap((row) => [
      <GameLabel key={row.id} gameId={row.id} size="xs" colored rounded />,
      <GameLabel key={row.id} gameId={row.id} size="sm" colored rounded />,
      <GameLabel key={row.id} gameId={row.id} size="md" colored rounded />,
      <GameLabel key={row.id} gameId={row.id} size="lg" colored rounded />,
      <GameLabel key={row.id} gameId={row.id} size="xl" colored rounded />,
    ])}
  </div>
)
export const AllStyles = () => (
  <div style={gridStyles}>
    {pokemonGames.flatMap((row) => [
      <GameLabel key={row.id} gameId={row.id} size="lg" />,
      <GameLabel key={row.id} gameId={row.id} size="lg" colored />,
      <GameLabel key={row.id} gameId={row.id} size="lg" colored rounded />,
    ])}
  </div>
)
