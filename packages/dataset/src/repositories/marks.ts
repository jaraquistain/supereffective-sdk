import _records from '../../data/marks.json'

import type { Mark } from '../schemas'

export function getMarks(): Mark[] {
  return _records as Mark[]
}
