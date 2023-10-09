import GameDetail from '@/components/games/game-detail'
import { PageProps } from '@/lib/types'
import { pokemonGames } from '@supeffective/dataset'
import { notFound } from 'next/navigation'

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  return pokemonGames.map((record) => ({
    id: record.id,
  }))
}

export default function Page({ params }: PageProps<['id']>) {
  const game = pokemonGames.find((record) => record.id === params.id)

  if (!game) {
    return notFound()
  }

  return <GameDetail game={game} />
}
