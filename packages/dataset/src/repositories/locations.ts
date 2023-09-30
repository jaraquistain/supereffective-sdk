import _records from '../../data/v2/locations.json'

import type { Location } from '../schemas'

export function getLocations(): Location[] {
  return _records as Location[]
}
