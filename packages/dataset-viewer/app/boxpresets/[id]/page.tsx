import PresetBoxes from '@/components/boxpresets/preset-boxes'
import { BASE_DATA_URL } from '@/lib/constants'
import { PageProps } from '@/lib/types'
import { fetchBoxPreset, fetchBoxPresetIndex, findGameById } from '@supeffective/dataset'
import { notFound } from 'next/navigation'

const records = await fetchBoxPresetIndex(BASE_DATA_URL)

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  return records.map((record) => ({
    id: record.id,
    gameSetId: record.gameSet,
  }))
}

export default async function Page({ params, searchParams }: PageProps<['id']>) {
  const found = records.find((record) => record.id === params.id)
  if (!found) {
    notFound()
  }

  const record = await fetchBoxPreset(found.id, found.gameSet, BASE_DATA_URL)

  const gameSet = await findGameById(record.gameSet, BASE_DATA_URL)
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
