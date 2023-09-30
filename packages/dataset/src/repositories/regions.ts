import _records from '../../data/v2/regions.json'

import type { Region } from '../schemas'

export function getRegions(): Region[] {
  return _records
}
