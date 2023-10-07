import { PokeImg3d } from '@/components/pkm/images'
import { Button } from '@/components/ui/button'
import ModalRoute from '@/components/ui/modal-route'
import { datasetClient } from '@/lib/dataset-client'
import { PageProps } from '@/lib/types'
import { notFound } from 'next/navigation'

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  const records = await datasetClient.pokemon.getAll()

  return records.map((record) => ({
    id: record.id,
  }))
}

export default async function Page({ params }: PageProps<['id']>) {
  const pkm = await datasetClient.pokemon.findById(params.id)
  if (!pkm) {
    notFound()
  }

  const header = <div>{pkm.name}</div>
  const footer = (
    <div>
      <Button asChild>
        <a href={`/pokemon/${pkm.id}`}>View</a>
      </Button>
    </div>
  )

  return (
    <ModalRoute header={header} footer={footer}>
      <PokeImg3d assetId={pkm.nid} className="h-48 w-48 [&_img]:w-full" />
      <PokeImg3d assetId={pkm.nid} shiny className="h-48 w-48 [&_img]:w-full" />
    </ModalRoute>
  )
}
