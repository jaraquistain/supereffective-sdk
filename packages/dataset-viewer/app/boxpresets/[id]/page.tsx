import PresetBoxes from '@/components/boxpresets/preset-boxes'
import { datasetClient } from '@/lib/dataset-client'
import { PageProps } from '@/lib/types'
import { pokemonGamesMap } from '@supeffective/dataset'
import { notFound } from 'next/navigation'

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  const records = await datasetClient.boxPresets.getAll()

  return records.map((record) => ({
    id: record.id,
  }))
}

export default async function Page({ params, searchParams }: PageProps<['id']>) {
  const record = await datasetClient.boxPresets.findById(params.id)
  if (!record) {
    notFound()
  }

  const gameSet = pokemonGamesMap.get(record.gameSet)
  if (!gameSet) {
    notFound()
  }

  return (
    <div className="px-2 sm:p-8 flex flex-col gap-4 w-full">
      <h1 className="text-4xl font-extrabold tracking-tighter">Box Presets</h1>
      <h2 className="text-2xl font-semibold mb-2 flex gap-3 text-muted-foreground">
        {gameSet.name} - {record.name}
      </h2>
      <p className="text-lg text-muted-foreground">{record.description}</p>
      <PresetBoxes preset={record} withLabels={searchParams.labels === '1'} />
    </div>
  )
}
