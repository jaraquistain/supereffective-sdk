import PokedexEntries from '@/components/pokedex/pokedex-entries'
import { BASE_DATA_URL } from '@/lib/constants'
import { PageProps } from '@/lib/types'
import { fetchPokedex, fetchPokedexIndex } from '@supeffective/dataset'
import { notFound } from 'next/navigation'

const records = await fetchPokedexIndex(BASE_DATA_URL)

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  return records.map((record) => ({
    id: record.id,
    regionId: record.region,
  }))
}

export default async function Page({ params, searchParams }: PageProps<['id']>) {
  const found = records.find((record) => record.id === params.id)
  if (!found) {
    notFound()
  }
  const record = await fetchPokedex(found.id, found.region, BASE_DATA_URL)

  return (
    <div className="p-8 flex flex-col gap-4 w-full">
      <h1 className="text-4xl font-extrabold tracking-tighter">Pokedexes</h1>
      <div className="text-2xl font-semibold mb-2 flex gap-3 text-muted-foreground">{record.name}</div>
      <PokedexEntries dex={record} withForms={searchParams.forms === '1'} />
    </div>
  )
}
