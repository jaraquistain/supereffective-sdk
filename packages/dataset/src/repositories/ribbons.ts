import _records from '../../data/ribbons.json'

import type { Ribbon } from '@supeffective/dataset-schemas'

export function getRibbons(): Ribbon[] {
  return _records as Ribbon[]
}
