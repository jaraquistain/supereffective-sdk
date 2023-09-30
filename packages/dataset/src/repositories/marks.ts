import _records from '../../data/v2/marks.json'

import type { Mark } from '../schemas'

export function getMarks(): Mark[] {
  return _records as Mark[]
}
