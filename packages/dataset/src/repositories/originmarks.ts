import _records from '../../data/v2/originmarks.json'

import type { OriginMark } from '../schemas'

export function getOriginMarks(): OriginMark[] {
  return _records as OriginMark[]
}
