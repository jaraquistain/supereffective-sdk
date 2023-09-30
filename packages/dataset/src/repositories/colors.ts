import _records from '../../data/v2/colors.json'

import type { Color } from '../schemas'

export function getColors(): Color[] {
  return _records
}
