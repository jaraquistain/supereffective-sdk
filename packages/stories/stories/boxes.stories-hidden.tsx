import { Awaited, type AwaitedProps } from '@r1stack/react'
import { useState } from 'react'

import { type Pokemon, createHttpDataProvider, createPokemonRepository } from '@supeffective/dataset'
import type { LivingDex } from '@supeffective/dextracker'
import {
  GameIconImgFile,
  LivingDexGrid,
  type LivingDexGridBoxDisplayOptions,
  PKM_DEFAULT_ASSETS_URL,
} from '@supeffective/ui'

import { StoryWrapper } from '../src/StoryWrapper'
import { generateLivingDex } from '../src/generate200Boxes'

export default {
  title: 'Home',
  // icon: <span>🏠</span>,
}

export const LivingDexDemo = () => {
  const [displayOptions, setDisplayOptions] = useState<LivingDexGridBoxDisplayOptions>({
    sprites: true,
    types: true,
    numbers: false,
    names: false,
    uncaught: false,
    indicators: false,
    view: 'grid',
  })

  const controls = (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(20ch, 1fr))',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBlockEnd: 2,
        gap: 2,
        border: '1px solid blue',
        backgroundColor: 'rgba(0,0,255,0.3)',
        borderRadius: '8px',
        fontSize: '0.7rem',
        marginBottom: '1rem',
        padding: '0.75rem',
      }}
    >
      <label>
        <input
          type="checkbox"
          onChange={(e) => {
            console.log(e.target.checked ? 'grid' : 'unified')
            setDisplayOptions({
              ...displayOptions,
              view: e.target.checked ? 'grid' : 'unified',
            })
          }}
          checked={displayOptions.view === 'grid'}
        />
        Toggle Grid/List view
      </label>
      <label>
        <input
          type="checkbox"
          onChange={(e) => {
            setDisplayOptions({
              ...displayOptions,
              sprites: e.target.checked,
            })
          }}
          checked={displayOptions.sprites}
        />
        Show Sprites
      </label>
      <label>
        <input
          type="checkbox"
          onChange={(e) => {
            setDisplayOptions({
              ...displayOptions,
              types: e.target.checked,
            })
          }}
          checked={displayOptions.types}
        />
        Show Types
      </label>
      <label>
        <input
          type="checkbox"
          onChange={(e) => {
            setDisplayOptions({
              ...displayOptions,
              numbers: e.target.checked,
            })
          }}
          checked={displayOptions.numbers}
        />
        Show Dex Num.
      </label>
      <label>
        <input
          type="checkbox"
          onChange={(e) => {
            setDisplayOptions({
              ...displayOptions,
              names: e.target.checked,
            })
          }}
          checked={displayOptions.names}
        />
        Show Names
      </label>
      <label>
        <input
          type="checkbox"
          onChange={(e) => {
            setDisplayOptions({
              ...displayOptions,
              uncaught: e.target.checked,
            })
          }}
          checked={displayOptions.uncaught}
        />
        Show Uncaught
      </label>
      <label>
        <input
          type="checkbox"
          onChange={(e) => {
            setDisplayOptions({
              ...displayOptions,
              indicators: e.target.checked,
            })
          }}
          checked={displayOptions.indicators}
        />
        Indicators
      </label>
    </div>
  )

  const props: AwaitedProps<[Pokemon[], LivingDex]> = {
    fallback: 'Loading data from the server...',
    loader: async () => {
      const pokemon = await createPokemonRepository(createHttpDataProvider(PKM_DEFAULT_ASSETS_URL)).getAll()
      const livingDex = await generateLivingDex(3, 30)

      return [pokemon, livingDex]
    },
    children: ([pokemon, livingDex]) => {
      // const livingDex = createLivingDexForGame(games.find(game => game.id === 'b2w2-b2')!, pokemon)

      return (
        <StoryWrapper>
          <h1>{livingDex.title} - Living Dex</h1>
          <GameIconImgFile variant="icons-circle" assetId={livingDex.gameId} />
          {controls}
          <LivingDexGrid
            // className={css({
            //   background: 'cPrimarySoft',
            // })}
            livingdex={livingDex}
            pokedex={pokemon}
            onCellPress={(cell, _box, updateCell) => {
              console.log('onPress', cell.state)
              updateCell(cell, { state: { caught: !cell.state?.caught } })
            }}
            onCellLongPress={(cell, _box, updateCell) => {
              console.log('onLongPress', cell.state)
              updateCell(cell, { state: { shiny: !cell.state?.shiny } })
            }}
            displayOptions={displayOptions}
          />
        </StoryWrapper>
      )
    },
  }

  return <Awaited {...props} />
}

// Main.storyTitle = 'Main Component'
