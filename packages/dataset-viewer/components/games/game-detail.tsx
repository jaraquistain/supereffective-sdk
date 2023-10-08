import { Game, pokemonGames } from '@supeffective/dataset'
import Link from 'next/link'
import { Suspense } from 'react'
import { GameAvatarImg, GameImg } from '../pkm/images'
import GamePokeList from './game-poke-list'

const games = pokemonGames

export default function GameDetail({ game, query }: { game: Game; query: string }) {
  const gameSetId = game.type === 'set' ? game.id : game.gameSet ? game.gameSet : game.type === 'game' ? game.id : null

  const gameSet = games.find((row) => row.id === gameSetId)

  function _renderGameVersions() {
    const results = games.filter(
      (row) =>
        row.gameSet === game.id ||
        (row.type !== 'set' && row.gameSuperSet === game.id) ||
        (row.id === game.id && game.type === 'game'),
    )

    if (results.length === 0) {
      return null
    }

    const versions = results.filter((row) => row.type === 'game')
    const dlcs = results.filter((row) => row.type === 'dlc')

    return (
      <>
        <div>
          <div className="text-2xl font-semibold mb-2 flex gap-3">Versions</div>
          <ul className="flex gap-2">
            {versions.map((game) => (
              <li key={game.id} className="">
                <Link href={`/games/${game.id}${query}`}>
                  <GameImg assetId={game.id} className="w-32" title={game.name} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {dlcs.length > 0 && (
          <div>
            <div className="text-2xl font-semibold mb-2 flex gap-3">DLCs</div>
            <ul className="flex gap-2">
              {dlcs.map((game) => (
                <li key={game.id} className="">
                  <Link href={`/games/${game.id}${query}`}>
                    <GameImg assetId={game.id} className="w-32" title={game.name} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }

  function _renderGameSets() {
    if (game.type === 'set') {
      return null
    }

    const ids = new Set<string>()

    if (game.gameSet) {
      ids.add(game.gameSet)
    }

    games.forEach((row) => {
      if (game.type === 'superset' && row.gameSuperSet === game.id && row.type !== 'game') {
        ids.add(row.id)
      }

      if (row.gameSet === game.id) {
        ids.add(row.id)
      }
    })

    const results = games.filter((row) => ids.has(row.id))
    if (results.length === 0) {
      return null
    }

    return (
      <div>
        <div className="text-2xl font-semibold mb-2">Sets</div>
        <ul className="flex gap-2">
          {results.map((game) => (
            <li key={game.id} className="">
              <Link href={`/games/${game.id}${query}`}>
                <GameAvatarImg assetId={game.id} className="w-32" title={game.name} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  function _renderGameSuperSets() {
    if (game.type === 'superset') {
      return null
    }

    const ids = new Set<string>()

    if (game.gameSuperSet) {
      ids.add(game.gameSuperSet)
    }

    games.forEach((row) => {
      if (game.type === 'superset' && row.gameSuperSet === game.id && row.type !== 'game') {
        ids.add(row.id)
      }
    })

    const results = games.filter((row) => ids.has(row.id))
    if (results.length === 0) {
      return null
    }

    return (
      <div>
        <div className="text-2xl font-semibold mb-2 flex gap-3">Super Sets</div>
        <ul className="flex gap-2">
          {results.map((game) => (
            <li key={game.id} className="">
              <Link href={`/games/${game.id}${query}`}>
                <GameAvatarImg assetId={game.id} className="w-32" title={game.name} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  function _renderPokemon() {
    if (!gameSet) {
      return <>No gameSet</>
    }
    return (
      <div className="flex flex-col mt-5 flex-row gap-4">
        <div className="w-full">
          <div className="text-2xl font-semibold mb-2 flex gap-3">Event Pokémon</div>
          <p className="text-lg text-muted-foreground mb-2">
            Pokémon that can only be obtained through events or distributions
          </p>
          <Suspense fallback={<div>Loading...</div>}>
            <GamePokeList game={gameSet} query={query} isEventOnly />
          </Suspense>
        </div>
        <div className="w-full">
          <div className="text-2xl font-semibold mb-2 flex gap-3">Transfer-only Pokémon</div>
          <p className="text-lg text-muted-foreground mb-2">
            Pokémon that can only be obtained by transferring them from other games (unless they are event-only)
          </p>
          <Suspense fallback={<div>Loading...</div>}>
            <GamePokeList game={gameSet} query={query} isTransferOnly />
          </Suspense>
        </div>
        <div className="w-full">
          <div className="text-2xl font-semibold mb-2 flex gap-3">Non-Storable Pokémon</div>
          <p className="text-lg text-muted-foreground mb-2">
            Obtainable Pokémon that cannot be stored in the game&apos;s storage system
          </p>
          <Suspense fallback={<div>Loading...</div>}>
            <GamePokeList game={gameSet} query={query} isNotStorable />
          </Suspense>
        </div>
        <div className="w-full">
          <div className="text-2xl font-semibold mb-2 flex gap-3">Obtainable Pokémon</div>
          <p className="text-lg text-muted-foreground mb-2">
            Pokémon that can be obtained in-game through normal gameplay or as a gift under certain conditions
          </p>
          <Suspense fallback={<div>Loading...</div>}>
            <GamePokeList game={gameSet} query={query} isObtainable />
          </Suspense>
        </div>
      </div>
    )
  }

  return (
    <div className="container p-5 ">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold tracking-tighter">Games</h1>
        <div className="text-2xl font-semibold mb-2 flex gap-3 text-muted-foreground">{game.name}</div>
        <div className="flex gap-12">
          {_renderGameVersions()}
          {_renderGameSets()}
          {_renderGameSuperSets()}
        </div>
      </div>
      {_renderPokemon()}
    </div>
  )
}
