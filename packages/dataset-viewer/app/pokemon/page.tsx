import PokeList from '@/components/pkm/poke-list'
import { PageProps } from '@/lib/types'

export default function Page({ searchParams }: PageProps) {
  const region = searchParams.region ?? 'kanto'
  const showForms = Boolean(searchParams.forms)

  return (
    <>
      <PokeList region={region} showForms={showForms} />
    </>
  )
}
