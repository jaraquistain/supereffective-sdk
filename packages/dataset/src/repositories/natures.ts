import _records from '../../data/v2/natures.json'

import type { Nature } from '../schemas'

export function getNatures(): Nature[] {
  return _records as Nature[]
}
