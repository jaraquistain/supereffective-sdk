import _records from '../../data/v2/ribbons.json'

import type { Ribbon } from '../schemas'

export function getRibbons(): Ribbon[] {
  return _records as Ribbon[]
}
