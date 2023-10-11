import { getPokemonCollection } from '@/lib/queries'
import { BoxPreset, Pokemon } from '@supeffective/dataset'
import { GridBoxGroup } from '../layout/grids'
import PokeGrid from '../pkm/poke-grid'
import { Button } from '../ui/button'
import EditSourceLink from '../ui/edit-on-github'
import { LabelsToggler } from './labels-toggler'

export default async function PresetBoxes({
  preset,
  withLabels,
}: {
  preset: BoxPreset
  withLabels?: boolean
}) {
  const allPokemon = await getPokemonCollection()
  const pokemonMap = new Map(allPokemon.map((row) => [row.id, row]))
  const boxes: Array<Array<Pokemon | null>> = []

  for (const box of preset.boxes) {
    const entries: Array<Pokemon | null> = box.pokemon.map((cell) => {
      if (cell === null) {
        return null
      }

      const pokeId = typeof cell === 'object' ? cell.pid : cell
      const pokemon = pokemonMap.get(pokeId)
      if (!pokemon) {
        throw new Error(`Pokemon ${pokeId} not found`)
      }
      return pokemon
    })
    boxes.push(entries)
  }

  const srcFile = preset.gameSet
    ? `packages/dataset/data/boxpresets/${preset.gameSet}/${preset.id}.json`
    : `packages/dataset/data/boxpresets/${preset.id}.json`

  return (
    <>
      <div>
        <Button asChild className="inline-flex">
          <EditSourceLink className="my-3" file={srcFile}>
            Edit on Github
          </EditSourceLink>
        </Button>
        <br />
        <LabelsToggler className="inline-flex" />
      </div>

      <GridBoxGroup size="xl">
        {boxes.map((box, i) => {
          const boxTitle = preset.boxes[i].title ?? `Box ${i + 1}`
          return (
            <div key={`${preset.id}-box-${i}`} className="flex flex-col gap-3 items-stretch">
              <div className="text-center text-lg font-bold rounded-xl border p-2 bg-slate-200 dark:bg-slate-800">
                {boxTitle}
              </div>
              <PokeGrid
                className="my-0 flex-1"
                pokemon={box}
                withDexNums={withLabels}
                withNames={withLabels}
                gridOptions={{
                  size: 'xs',
                  cols: 6,
                  rows: 5,
                }}
                filters={{
                  isForm: true,
                }}
              />
            </div>
          )
        })}
      </GridBoxGroup>
    </>
  )
}
