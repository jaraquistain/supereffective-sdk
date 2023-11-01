import { PokeImg3d } from '@/components/pkm/images'
import { Button } from '@/components/ui/button'
import EditSourceLink from '@/components/ui/edit-on-github'
import ModalRoute from '@/components/ui/modal-route'
import { BASE_DATA_URL } from '@/lib/constants'
import { PageProps } from '@/lib/types'
import { fetchPokemon, fetchPokemonIndex } from '@supeffective/dataset'
import { notFound } from 'next/navigation'

const records = await fetchPokemonIndex(BASE_DATA_URL)

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  return records.map((record) => ({
    id: record.id,
    regionId: record.region,
  }))
}

export default async function Page({ params }: PageProps<['id']>) {
  const found = records.find((record) => record.id === params.id)
  if (!found) {
    notFound()
  }

  const pkm = await fetchPokemon(found.id, found.region, BASE_DATA_URL)

  const header = <div>{pkm.name}</div>
  const footer = (
    <div>
      <Button asChild>
        <EditSourceLink
          className="inline-flex align-middle ml-2"
          file={`packages/dataset/data/pokemon/${pkm.region}/${pkm.id}.json`}
        >
          Edit on Github
        </EditSourceLink>
      </Button>
    </div>
  )

  return (
    <ModalRoute header={header} footer={footer}>
      <div>
        <PokeImg3d assetId={pkm.nid} className="h-48 w-48 [&_img]:w-full" />
        <PokeImg3d assetId={pkm.nid} shiny className="h-48 w-48 [&_img]:w-full" />
        {/* <p>(WIP)</p> */}
      </div>
    </ModalRoute>
  )
}
