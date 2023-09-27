import _records from '../../data/gamesupersets.json'

import type { GameSuperSet } from '@supeffective/dataset-schemas'

export function getGameSuperSets(): GameSuperSet[] {
  return _records as GameSuperSet[]
}
