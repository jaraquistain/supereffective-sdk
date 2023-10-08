'use client'

import { Switch } from '@/components/ui/switch'

import { useSearchParamState } from '@/hooks/useSearchParamState'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef, useId } from 'react'
import { Label } from '../ui/label'

export const FormsToggler = ({ className, ...rest }: ComponentPropsWithoutRef<'div'>) => {
  const [value, setValue] = useSearchParamState('forms')
  const fieldId = useId()

  return (
    <div className={cn('flex items-center space-x-2', className)} {...rest}>
      <Label htmlFor={fieldId}>Show Forms</Label>
      <Switch
        id={fieldId}
        checked={value === '1'}
        onCheckedChange={(checked) => {
          setValue(checked ? '1' : undefined)
        }}
      />
    </div>
  )
}
