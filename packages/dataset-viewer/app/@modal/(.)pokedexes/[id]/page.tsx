import PokedexEntries from '@/components/pokedex/pokedex-entries'
import ModalRoute from '@/components/ui/modal-route'
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

  const header = <div>{record.name}</div>
  const footer = null

  return (
    <ModalRoute header={header} footer={footer} className="max-w-auto md:max-w-[60vw]">
      <PokedexEntries dex={record} withForms={searchParams.forms === '1'} />
    </ModalRoute>
  )
}
