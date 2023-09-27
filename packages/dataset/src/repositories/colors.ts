import _records from '../../data/colors.json'

import type { Color } from '@supeffective/dataset-schemas'

export function getColors(): Color[] {
  return _records
}
