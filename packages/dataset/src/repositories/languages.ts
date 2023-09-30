import _records from '../../data/v2/languages.json'

import type { Language } from '../schemas'

export function getLanguages(): Language[] {
  return _records as Language[]
}
