import { datasetClient } from '@/lib/dataset-client'
import { BoxPreset, Pokemon } from '@supeffective/dataset'
import { gridRecipe } from '@supeffective/ui'
import PokeGrid from '../pkm/poke-grid'
import { Button } from '../ui/button'
import EditSourceLink from '../ui/edit-on-github'

export default async function PresetBoxes({
  preset,
}: {
  preset: BoxPreset
}) {
  const allPokemon = await datasetClient.pokemon.getAll()
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
      </div>

      <div
        className={gridRecipe({
          className: 'w-full items-stretch gap-3 sm:gap-4 rounded-md border my-6 p-4',
          size: 'xl',
          boxGroup: true,
        })}
      >
        {boxes.map((box, i) => {
          const boxTitle = preset.boxes[i].title ?? `Box ${i + 1}`
          return (
            <div key={`${preset.id}-box-${i}`} className="flex flex-col gap-3 items-stretch">
              <div className="text-center text-lg font-bold rounded-xl border p-2 bg-slate-800">{boxTitle}</div>
              <PokeGrid
                className="my-0 flex-1"
                pokemon={box}
                gridOptions={{
                  size: 'md',
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
      </div>
    </>
  )
}
