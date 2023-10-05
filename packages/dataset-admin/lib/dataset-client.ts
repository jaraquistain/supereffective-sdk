import { createDatasetClient } from '@supeffective/dataset'

export const BASE_DATA_URL = 'https://itsjavi.com/supereffective-sdk/data'
export const BASE_IMAGE_URL = 'https://itsjavi.com/supereffective-assets/assets'

export const datasetClient = createDatasetClient({
  baseDataUrl: BASE_DATA_URL,
  baseImageUrl: BASE_IMAGE_URL,
})
