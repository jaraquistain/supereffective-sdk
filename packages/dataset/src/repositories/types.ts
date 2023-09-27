import _records from '../../data/types.json'

import type { PokeType } from '@supeffective/dataset-schemas'

export function getTypes(): PokeType[] {
  return _records as PokeType[]
}
