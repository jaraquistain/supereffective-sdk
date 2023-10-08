import { BoxPreset, Pokedex } from '@supeffective/dataset'
import { datasetClient } from './dataset-client'

export async function getPokedexesByGameSet(gameSet: string): Promise<Pokedex[]> {
  const dexes = await datasetClient.pokedexes.getAll()
  return dexes.filter((row) => row.gameSets.includes(gameSet))
}

export async function getBoxPresetsByGameSet(gameSet: string): Promise<BoxPreset[]> {
  const presets = await datasetClient.boxPresets.getAll()
  return presets.filter((row) => row.gameSet === gameSet)
}
