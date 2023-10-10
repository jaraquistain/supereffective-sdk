'use client'

import { PokeTypeId } from '@supeffective/dataset'
import { TypeIcon as LegacyTypeIcon } from '@supeffective/ui-legacy'

export function TypeIcon({ typeId, className }: { typeId?: string | PokeTypeId; className?: string }) {
  if (!typeId) {
    return null
  }

  return <LegacyTypeIcon size="sm" colored rounded filled typeId={typeId as PokeTypeId} className={className} />
}
