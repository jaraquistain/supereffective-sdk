import _records from '../../data/originmarks.json'

import type { OriginMark } from '@supeffective/dataset-schemas'

export function getOriginMarks(): OriginMark[] {
  return _records as OriginMark[]
}
