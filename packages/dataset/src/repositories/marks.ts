import _records from '../../data/marks.json'

import type { Mark } from '@supeffective/dataset-schemas'

export function getMarks(): Mark[] {
  return _records as Mark[]
}
