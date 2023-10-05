import type { Story } from '@storylite/storylite'
import { createHttpDataProvider, createPokemonRepository } from '@supeffective/dataset'
import { PokeAvatarCard } from '@supeffective/ui'

import { DecoGrid, DecoWrapper } from '../src/decorators'
import { DATA_URL } from '../src/utils'

export default {
  title: 'Pokemon Card',
  component: PokeAvatarCard,
  decorators: [
    (Story: any) => (
      <DecoWrapper>
        <Story />
      </DecoWrapper>
    ),
  ],
} satisfies Story<any>

const repo = createPokemonRepository(createHttpDataProvider(DATA_URL))
const keldeo = await repo.getById('keldeo-resolute')
const alcremie = await repo.getById('alcremie-matcha-cream-strawberry')
const eternatus = await repo.getById('eternatus-eternamax')
const oinkologneFem = await repo.getById('oinkologne-f')
const miraidon = await repo.getById('miraidon')
const poltchageist = await repo.getById('poltchageist')

export const withAllInfos = () => (
  <>
    <h3>Vertical</h3>
    <DecoGrid columns={'auto-fill'}>
      <PokeAvatarCard pokemon={keldeo} size="xs" />
      <PokeAvatarCard pokemon={alcremie} size="sm" />
      <PokeAvatarCard pokemon={eternatus} />
      <PokeAvatarCard pokemon={miraidon} size="md" />
      <PokeAvatarCard pokemon={poltchageist} size="lg" />
      <PokeAvatarCard pokemon={oinkologneFem} size="xl" />
    </DecoGrid>

    <h3>Horizontal</h3>
    <DecoGrid columns={'auto-fill'}>
      <PokeAvatarCard pokemon={keldeo} horizontal size="xs" />
      <PokeAvatarCard pokemon={alcremie} horizontal size="sm" />
      <PokeAvatarCard pokemon={eternatus} horizontal />
      <PokeAvatarCard pokemon={miraidon} horizontal size="md" />
      <PokeAvatarCard pokemon={poltchageist} horizontal size="lg" />
      <PokeAvatarCard pokemon={oinkologneFem} horizontal size="xl" />
    </DecoGrid>
  </>
)

export const differentSizes = () => (
  <>
    <DecoGrid columns={6}>
      <PokeAvatarCard pokemon={keldeo} size="xs" />
      <PokeAvatarCard pokemon={alcremie} size="sm" />
      <PokeAvatarCard pokemon={eternatus} />
      <PokeAvatarCard pokemon={miraidon} size="md" />
      <PokeAvatarCard pokemon={poltchageist} size="lg" />
      <PokeAvatarCard pokemon={oinkologneFem} size="xl" />
    </DecoGrid>
  </>
)

export const differentArtStyles = () => (
  <>
    <DecoGrid columns={6}>
      <PokeAvatarCard pokemon={keldeo} variant="gen8-icon" />
      <PokeAvatarCard pokemon={keldeo} variant="gen8-icon-trimmed" />
      <PokeAvatarCard pokemon={keldeo} variant="home2d-icon" />
      <PokeAvatarCard pokemon={keldeo} variant="home2d-icon-trimmed" />
      <PokeAvatarCard pokemon={keldeo} variant="home3d-icon" />
      <PokeAvatarCard pokemon={keldeo} variant="home3d-icon-trimmed" />
    </DecoGrid>
  </>
)

export const differentTextLengths = () => (
  <>
    <DecoGrid columns={6}>
      <PokeAvatarCard pokemon={keldeo} />
      <PokeAvatarCard pokemon={alcremie} />
      <PokeAvatarCard pokemon={eternatus} />
      <PokeAvatarCard pokemon={miraidon} />
      <PokeAvatarCard pokemon={poltchageist} />
      <PokeAvatarCard pokemon={oinkologneFem} />
      {/* 2nd row: */}
      <PokeAvatarCard pokemon={keldeo} shiny />
      <PokeAvatarCard pokemon={alcremie} shiny />
      <PokeAvatarCard pokemon={eternatus} shiny />
      <PokeAvatarCard pokemon={miraidon} shiny />
      <PokeAvatarCard pokemon={poltchageist} shiny />
      <PokeAvatarCard pokemon={oinkologneFem} shiny />
    </DecoGrid>
  </>
)

export const shinyIndicator = () => (
  <>
    <DecoGrid columns={6}>
      <PokeAvatarCard pokemon={keldeo} size="xs" shiny />
      <PokeAvatarCard pokemon={keldeo} size="sm" shiny />
      <PokeAvatarCard pokemon={keldeo} size="md" shiny />
      <PokeAvatarCard pokemon={keldeo} shiny />
      <PokeAvatarCard pokemon={keldeo} size="lg" shiny />
      <PokeAvatarCard pokemon={keldeo} size="xl" shiny />
    </DecoGrid>
  </>
)

const displayOptionsOff = {
  dexNum: false,
  name: false,
  shinyIcon: false,
  types: false,
}
export const withoutInfos = () => (
  <>
    <DecoGrid columns={6}>
      <PokeAvatarCard pokemon={keldeo} displayOptions={displayOptionsOff} />
      <PokeAvatarCard pokemon={alcremie} displayOptions={displayOptionsOff} />
      <PokeAvatarCard pokemon={eternatus} displayOptions={displayOptionsOff} />
      <PokeAvatarCard pokemon={miraidon} displayOptions={displayOptionsOff} />
      <PokeAvatarCard pokemon={poltchageist} displayOptions={displayOptionsOff} />
      <PokeAvatarCard pokemon={oinkologneFem} displayOptions={displayOptionsOff} />
      {/* 2nd row: */}
      <PokeAvatarCard pokemon={keldeo} displayOptions={displayOptionsOff} shiny />
      <PokeAvatarCard pokemon={alcremie} displayOptions={displayOptionsOff} shiny />
      <PokeAvatarCard pokemon={eternatus} displayOptions={displayOptionsOff} shiny />
      <PokeAvatarCard pokemon={miraidon} displayOptions={displayOptionsOff} shiny />
      <PokeAvatarCard pokemon={poltchageist} displayOptions={displayOptionsOff} shiny />
      <PokeAvatarCard pokemon={oinkologneFem} displayOptions={displayOptionsOff} shiny />
    </DecoGrid>
  </>
)

const optsNumOnly = {
  dexNum: false,
  name: true,
  shinyIcon: true,
  types: false,
}
export const withNameOnly = () => (
  <>
    <DecoGrid columns={6}>
      <PokeAvatarCard pokemon={keldeo} displayOptions={optsNumOnly} />
      <PokeAvatarCard pokemon={alcremie} displayOptions={optsNumOnly} />
      <PokeAvatarCard pokemon={eternatus} displayOptions={optsNumOnly} />
      <PokeAvatarCard pokemon={miraidon} displayOptions={optsNumOnly} />
      <PokeAvatarCard pokemon={poltchageist} displayOptions={optsNumOnly} />
      <PokeAvatarCard pokemon={oinkologneFem} displayOptions={optsNumOnly} />
      {/* 2nd row: */}
      <PokeAvatarCard pokemon={keldeo} displayOptions={optsNumOnly} shiny />
      <PokeAvatarCard pokemon={alcremie} displayOptions={optsNumOnly} shiny />
      <PokeAvatarCard pokemon={eternatus} displayOptions={optsNumOnly} shiny />
      <PokeAvatarCard pokemon={miraidon} displayOptions={optsNumOnly} shiny />
      <PokeAvatarCard pokemon={poltchageist} displayOptions={optsNumOnly} shiny />
      <PokeAvatarCard pokemon={oinkologneFem} displayOptions={optsNumOnly} shiny />
    </DecoGrid>
  </>
)
