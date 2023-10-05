import type { Game, Pokemon } from '@supeffective/dataset'

export function getPokemonForGame(game: Game, pokemon: Pokemon[]): Pokemon[] {
  const pokemonStorable = pokemon.filter(
    (p) => p.storableIn.includes(game.id) || (game.gameSet && p.storableIn.includes(game.gameSet)),
  )

  return pokemonStorable
}
