import PokedexEntries from '@/components/pokedex/pokedex-entries'
import ModalRoute from '@/components/ui/modal-route'
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

  const header = <div>{record.name}</div>
  const footer = null

  return (
    <ModalRoute header={header} footer={footer} className="max-w-auto md:max-w-[60vw]">
      <PokedexEntries dex={record} withForms={searchParams.forms === '1'} />
    </ModalRoute>
  )
}
