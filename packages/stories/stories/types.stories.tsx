import type { CSSProperties } from 'react'

import type { Story } from '@storylite/storylite'
import { pokemonTypes } from '@supeffective/dataset'
import { TypeIcon } from '@supeffective/ui'

export default {
  title: 'Type Icons',
  component: TypeIcon,
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
}

export const Defaults = () => (
  <div style={gridStyles}>
    {pokemonTypes.map((pokeType) => (
      <TypeIcon key={pokeType.id} typeId={pokeType.id} />
    ))}
  </div>
)

export const InheritsParentColor = () => (
  <div style={{ color: '#888' }}>
    <div style={gridStyles}>
      {pokemonTypes.map((pokeType) => (
        <>
          <TypeIcon key={pokeType.id} typeId={pokeType.id} />
          <TypeIcon key={pokeType.id} typeId={pokeType.id} filled />
          <TypeIcon key={pokeType.id} typeId={pokeType.id} terastal />
          <TypeIcon key={pokeType.id} typeId={pokeType.id} rounded filled />
        </>
      ))}
    </div>
  </div>
)

export const Colored = () => (
  <div style={gridStyles}>
    {pokemonTypes.map((pokeType) => (
      <TypeIcon key={pokeType.id} typeId={pokeType.id} colored />
    ))}
  </div>
)

export const FilledNotColored = () => (
  <div style={gridStyles}>
    {pokemonTypes.map((pokeType) => (
      <TypeIcon key={pokeType.id} typeId={pokeType.id} filled />
    ))}
  </div>
)

export const Rounded = () => (
  <div style={gridStyles}>
    {pokemonTypes.map((pokeType) => (
      <TypeIcon key={pokeType.id} typeId={pokeType.id} rounded size="md" filled colored />
    ))}
  </div>
)

export const ColoredAndFilled = () => (
  <div style={gridStyles}>
    {pokemonTypes.map((pokeType) => (
      <TypeIcon key={pokeType.id} typeId={pokeType.id} filled colored />
    ))}
  </div>
)

export const Terastal = () => (
  <>
    <div style={gridStyles}>
      {pokemonTypes.flatMap((pokeType) => [
        <TypeIcon key={pokeType.id} typeId={pokeType.id} size="sm" terastal colored />,
        <TypeIcon key={`${pokeType.id}_f`} typeId={pokeType.id} size="sm" filled colored />,
      ])}
    </div>
  </>
)

export const DifferentSizes = () => (
  <div style={{ position: 'relative' }}>
    {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
      <div key={`${size}_c`} style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <h3 key={`${size}_h`}>{size.toUpperCase()}</h3>
        <div key={`${size}_wr`} style={gridStyles}>
          {pokemonTypes.flatMap((pokeType) => [
            <TypeIcon key={`${pokeType.id}_s1`} typeId={pokeType.id} colored size={size as any} />,
            <TypeIcon key={`${pokeType.id}_s2`} typeId={pokeType.id} filled colored size={size as any} />,
            <TypeIcon key={`${pokeType.id}_s3`} typeId={pokeType.id} filled rounded colored size={size as any} />,
            <TypeIcon key={`${pokeType.id}_s4`} typeId={pokeType.id} terastal colored size={size as any} />,
          ])}
        </div>
      </div>
    ))}
  </div>
)
