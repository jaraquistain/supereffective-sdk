import { ArrowLeftRightIcon } from 'lucide-react'
import { GenerationSelector } from './gen-selector'
import { PokeListProps } from './types'

export default function PokeListHeader({ gen }: PokeListProps) {
  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tighter">Pokémon</h1>
      <div className="text-2xl font-semibold mb-2 flex gap-3">
        Generation {gen}{' '}
        <GenerationSelector className="align-middle">
          <ArrowLeftRightIcon size={16} />
        </GenerationSelector>
      </div>
    </>
  )
}
