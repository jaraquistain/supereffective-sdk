import { createDatasetClient } from '@supeffective/dataset'

export const BASE_DATA_URL = new URL(process.env.APP_DATA_URL ?? '/static/data').toString()
export const BASE_IMAGE_URL = new URL(process.env.APP_ASSETS_URL ?? '/static/assets').toString()

export const datasetClient = createDatasetClient({
  baseDataUrl: BASE_DATA_URL,
  baseImageUrl: BASE_IMAGE_URL,
})
