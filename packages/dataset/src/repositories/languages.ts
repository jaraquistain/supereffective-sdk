import _records from '../../data/languages.json'

import type { Language } from '@supeffective/dataset-schemas'

export function getLanguages(): Language[] {
  return _records as Language[]
}
