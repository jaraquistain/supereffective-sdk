import _records from '../../data/locations.json'

import type { Location } from '@supeffective/dataset-schemas'

export function getLocations(): Location[] {
  return _records as Location[]
}
