import PokedexEntries from '@/components/pokedex/pokedex-entries'
import { datasetClient } from '@/lib/dataset-client'
import { PageProps } from '@/lib/types'
import { notFound } from 'next/navigation'

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  const records = await datasetClient.pokedexes.getAll()

  return records.map((record) => ({
    id: record.id,
  }))
}

export default async function Page({ params, searchParams }: PageProps<['id']>) {
  const record = await datasetClient.pokedexes.findById(params.id)
  if (!record) {
    notFound()
  }

  return (
    <div className="p-8 flex flex-col gap-4 w-full">
      <h1 className="text-4xl font-extrabold tracking-tighter">Pokedexes</h1>
      <div className="text-2xl font-semibold mb-2 flex gap-3 text-muted-foreground">{record.name}</div>
      <PokedexEntries dex={record} withForms={searchParams.forms === '1'} />
    </div>
  )
}
