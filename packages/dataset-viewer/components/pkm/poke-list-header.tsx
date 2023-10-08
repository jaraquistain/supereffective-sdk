import EditSourceLink from '../ui/edit-on-github'
import { PokeListProps } from './types'

export default function PokeListHeader({ region }: PokeListProps) {
  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tighter">Pokémon</h1>
      <div className="text-2xl capitalize font-semibold mb-2 text-muted-foreground flex gap-3">
        {region} Region <EditSourceLink file={`packages/dataset/data/pokemon/${region}`} action="tree" />
      </div>
    </>
  )
}
