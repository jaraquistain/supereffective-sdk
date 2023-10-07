import { datasetClient } from '@/lib/dataset-client'
import { PageProps } from '@/lib/types'

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  const records = await datasetClient.pokemon.getAll()

  return records.map((record) => ({
    id: record.id,
  }))
}

export default function Page({ params }: PageProps<['id']>) {
  return <div className="p2 py-8">Pokemon: {params.id}</div>
}
