import GameList from '@/components/games/game-list'
import { PageProps } from '@/lib/types'
import { createQueryString } from '@/lib/utils'

export default function Page({ searchParams }: PageProps) {
  const queryStr = createQueryString(searchParams)

  return (
    <>
      <GameList query={queryStr} />
    </>
  )
}
