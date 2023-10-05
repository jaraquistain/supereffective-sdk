import type { Story } from '@storylite/storylite'
import { Box, PokeBox } from '@supeffective/ui'

import { DecoGrid, DecoWrapper } from '../src/decorators'
import { getPokemonCellSamples } from '../src/getPokemonSamples'

export default {
  title: 'Boxes',
  component: Box,
  decorators: [
    (Story: any) => (
      <DecoWrapper>
        <Story />
      </DecoWrapper>
    ),
  ],
} satisfies Story<any>

const pokeCells = await getPokemonCellSamples()
const pokeCellsWithEmpty = await getPokemonCellSamples([
  'bulbasaur',
  'ivysaur',
  'venusaur',
  'venusaur-f',
  'venusaur-mega',
  'venusaur-gmax',
  'keldeo-resolute',
  'alcremie-matcha-cream-strawberry',
  'eternatus-eternamax',
  'oinkologne-f',
  'miraidon',
  'poltchageist',
  'flamigo',
  'mimikyu',
  null,
  null,
])

export const BoxVariants = () => (
  <DecoGrid columns={'auto-fill'} minWidth={'320px'}>
    <div>
      <PokeBox
        header="With all display options"
        columns={6}
        rows={5}
        data={pokeCellsWithEmpty}
        artStyle="home3d-icon"
        // displayOptions={{ name: true, types: true, dexNum: true }}
        displayOptions={{ name: true, types: true, dexNum: true }}
      />
    </div>
    <div>
      <PokeBox
        header="Without the names"
        columns={6}
        rows={5}
        data={pokeCellsWithEmpty}
        artStyle="home3d-icon"
        // displayOptions={{ name: true, types: true, dexNum: true }}
        displayOptions={{ name: false, types: true, dexNum: true }}
      />
    </div>
    <div>
      <PokeBox
        header="Gen 8 Style"
        columns={6}
        rows={5}
        data={pokeCellsWithEmpty}
        artStyle="gen8-icon"
        displayOptions={{ name: false, types: false, dexNum: false }}
      />
    </div>
    <div>
      <PokeBox
        header="Gen 8 Style (Trimmed)"
        columns={6}
        rows={5}
        data={pokeCellsWithEmpty}
        artStyle="gen8-icon-trimmed"
        displayOptions={{ name: false, types: false, dexNum: false }}
      />
    </div>
    <div>
      <PokeBox
        header="SV Style"
        columns={6}
        rows={5}
        data={pokeCellsWithEmpty}
        artStyle="home2d-icon-trimmed"
        displayOptions={{ name: false, types: false, dexNum: false }}
      />
    </div>
    <div>
      <PokeBox
        header="HOME Style"
        columns={6}
        rows={5}
        data={pokeCellsWithEmpty}
        artStyle="home3d-icon-trimmed"
        displayOptions={{ name: false, types: false, dexNum: false }}
      />
    </div>
    <div>
      <h3>Without Title</h3>
      <PokeBox columns={6} rows={5} data={pokeCells} displayOptions={{ name: false, types: false, dexNum: false }} />
    </div>
    <div>
      <h3>5 columns, auto-fill rows</h3>
      <PokeBox
        columns={5}
        rows={'auto-fill'}
        data={pokeCells}
        displayOptions={{ name: false, types: false, dexNum: false }}
      />
    </div>
  </DecoGrid>
)
export const Responsive = () => (
  <div>
    <div>
      <PokeBox
        header="Responsive box with variable columns and rows"
        columns={'auto-fill'}
        rows={'auto-fill'}
        data={[...pokeCellsWithEmpty, ...pokeCellsWithEmpty, ...pokeCellsWithEmpty].map((c, i) => ({
          ...c,
          uid: `${c.uid}-${i}`,
        }))}
        artStyle="home3d-icon"
        // displayOptions={{ name: true, types: true, dexNum: true }}
        displayOptions={{ name: false, types: false, dexNum: false }}
      />
    </div>
  </div>
)
