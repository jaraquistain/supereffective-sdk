'use client'

import { PokeTypeId } from '@supeffective/dataset'
import { TypeIcon as LibTypeIcon } from '@supeffective/icons'

export function TypeIcon({ typeId, className }: { typeId?: string | PokeTypeId; className?: string }) {
  if (!typeId) {
    return null
  }

  return <LibTypeIcon size="sm" colored rounded filled typeId={typeId as PokeTypeId} className={className} />
}
