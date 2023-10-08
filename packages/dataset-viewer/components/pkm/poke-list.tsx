import { Suspense } from 'react'
import PokeListBody from './poke-list-body'
import PokeListHeader from './poke-list-header'
import { PokeListProps } from './types'

export default function PokeList(props: PokeListProps) {
  return (
    <div className="container p-5">
      <PokeListHeader {...props} />
      <Suspense fallback={<div>Loading...</div>}>
        <PokeListBody {...props} />
      </Suspense>
    </div>
  )
}
