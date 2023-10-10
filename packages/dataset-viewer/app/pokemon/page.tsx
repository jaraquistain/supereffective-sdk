import PokeList from '@/components/pkm/poke-list'
import { PageProps } from '@/lib/types'

export default function Page({ searchParams }: PageProps) {
  const region = searchParams.region ?? 'kanto'
  const table = Boolean(searchParams.table)
  const showForms = Boolean(searchParams.forms)

  return (
    <>
      <PokeList region={region} showForms={showForms} asTable={table} />
    </>
  )
}
