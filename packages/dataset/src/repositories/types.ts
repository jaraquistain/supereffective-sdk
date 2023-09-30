import _records from '../../data/v2/types.json'

import type { PokeType } from '../schemas'

export function getTypes(): PokeType[] {
  return _records as PokeType[]
}
