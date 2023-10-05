import type { CSSProperties } from 'react'

import type { Story } from '@storylite/storylite'
import { AssetAvatar, GameIconAvatar, ItemAvatar, MarkAvatar, PokeAvatar, RibbonAvatar } from '@supeffective/ui'

export default {
  title: 'Imagery',
  component: AssetAvatar,
  decorators: [
    (Story: any) => (
      <div
        className="dex-tracker-ui"
        style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '1rem' }}
      >
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
  alignContent: 'flex-end',
  alignItems: 'flex-end',
  marginBottom: '1rem',
}

export const pokeAvatar = () => (
  <>
    <div style={gridStyles}>
      <PokeAvatar assetId="0647" />
      <PokeAvatar assetId="0647-resolute" shiny />
      <PokeAvatar assetId="0647-resolute" shiny variant="gen8-icon" />
      <PokeAvatar assetId="0648" variant="home3d-icon" filled size="lg" />
      <PokeAvatar assetId="0648" variant="home2d-icon" filled clickable size="lg" />
      <PokeAvatar assetId="0648-pirouette" variant="home2d-icon" hoverable filled clickable rounded size="lg" />
      <PokeAvatar assetId="0648" variant="home2d-icon" hoverable filled clickable shiny rounded="soft" size="lg" />
    </div>
    <div style={gridStyles}>
      <PokeAvatar assetId="0132" filled size="xs" />
      <PokeAvatar assetId="0132" filled size="sm" />
      <PokeAvatar assetId="0132" filled size="md" />
      <PokeAvatar assetId="0132" filled shiny />
      <PokeAvatar assetId="0132" filled size="lg" />
      <PokeAvatar assetId="0132" filled size="xl" />
    </div>
    <div style={gridStyles}>
      <PokeAvatar assetId="0132" filled size="xs" condensed />
      <PokeAvatar assetId="0132" filled size="sm" condensed />
      <PokeAvatar assetId="0132" filled size="md" condensed />
      <PokeAvatar assetId="0132" filled shiny />
      <PokeAvatar assetId="0132" filled size="lg" condensed />
      <PokeAvatar assetId="0132" filled size="xl" condensed />
    </div>
  </>
)

export const ImgFiles = () => (
  <>
    <div style={gridStyles}>
      <GameIconAvatar assetId="rb" filled rounded condensed size="md" />
      <GameIconAvatar assetId="oras" filled rounded condensed size="lg" />
      <GameIconAvatar assetId="home" filled rounded condensed hoverable clickable size="xl" />
    </div>
    <div style={gridStyles}>
      <ItemAvatar assetId="masterball" filled rounded="soft" size="sm" />
      <MarkAvatar assetId="alpha-mark" filled rounded="soft" size="sm" />
      <RibbonAvatar assetId="battle-champion" filled rounded="soft" size="sm" />
    </div>
  </>
)
