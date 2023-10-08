import EditSourceLink from '../ui/edit-on-github'
import { PokeListProps } from './types'

export default function PokeListHeader({ gen }: PokeListProps) {
  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tighter">Pokémon</h1>
      <div className="text-2xl font-semibold mb-2 text-muted-foreground flex gap-3">
        Generation {gen} <EditSourceLink file="packages/dataset/data/pokemon" action="tree" />
      </div>
    </>
  )
}
