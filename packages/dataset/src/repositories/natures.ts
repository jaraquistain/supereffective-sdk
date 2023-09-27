import _records from '../../data/natures.json'

import type { Nature } from '@supeffective/dataset-schemas'

export function getNatures(): Nature[] {
  return _records as Nature[]
}
