import { getPokemonCollection } from '@/lib/queries'
import { Game } from '@supeffective/dataset'
import PokeGrid from '../pkm/poke-grid'

export default async function GamePokeList({
  game,
  isObtainable,
  isStorable,
  isNotStorable,
  isEventOnly,
  isTransferOnly,
}: {
  game: Game
  isObtainable?: boolean
  isStorable?: boolean
  isNotStorable?: boolean
  isEventOnly?: boolean
  isTransferOnly?: boolean
}) {
  const pokemon = await getPokemonCollection()

  return (
    <div className="">
      <PokeGrid
        pokemon={pokemon}
        withCounters
        withDexNums
        withNames
        filters={{
          isForm: true,
          obtainableIn: isObtainable ? game.id : undefined,
          storableIn: isStorable ? game.id : undefined,
          notStorableIn: isNotStorable ? game.id : undefined,
          eventOnlyIn: isEventOnly ? game.id : undefined,
          transferOnlyIn: isTransferOnly ? game.id : undefined,
        }}
      />
    </div>
  )
}
