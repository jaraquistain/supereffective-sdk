import _records from '../../data/regions.json'

import type { Region } from '@supeffective/dataset-schemas'

export function getRegions(): Region[] {
  return _records
}
