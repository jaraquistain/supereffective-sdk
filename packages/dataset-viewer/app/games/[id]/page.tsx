import GameDetail from '@/components/games/game-detail'
import { PageProps } from '@/lib/types'
import { createQueryString } from '@/lib/utils'
import { pokemonGames } from '@supeffective/dataset'
import { notFound } from 'next/navigation'

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  return pokemonGames.map((record) => ({
    id: record.id,
  }))
}

export default function Page({ params, searchParams }: PageProps<['id']>) {
  const game = pokemonGames.find((record) => record.id === params.id)
  const q = createQueryString(searchParams)

  if (!game) {
    return notFound()
  }

  return <GameDetail game={game} query={q} />
}
