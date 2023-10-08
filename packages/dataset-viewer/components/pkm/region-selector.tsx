'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSearchParamState } from '@/hooks/useSearchParamState'
import { pokemonRegions, pokemonRegionsMap } from '@supeffective/dataset'
import { ChevronsUpDownIcon } from 'lucide-react'
import { ReactNode } from 'react'

export const RegionSelector = ({
  children,
  className,
  variant = 'secondary',
}: { children?: ReactNode; className?: string; variant?: ButtonProps['variant'] }) => {
  const [param, setParam] = useSearchParamState('region', 'kanto')
  const record = pokemonRegionsMap.get(param)
  if (!record) {
    console.warn(`Invalid region: ${param}`)
    return null
  }

  const buttonText = children ?? `${record.name} Region`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant={variant} className={className}>
          {buttonText} <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>Change Generation:</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuRadioGroup value={param} onValueChange={setParam}>
          {pokemonRegions.map((row) => (
            <DropdownMenuRadioItem className="pr-2" key={`reg-${row.id}`} value={row.id}>
              {row.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
