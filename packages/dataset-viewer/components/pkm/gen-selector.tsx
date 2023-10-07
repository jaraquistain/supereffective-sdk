'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSearchParamState } from '@/hooks/useSearchParamState'
import { PKM_LATEST_GENERATION } from '@supeffective/dataset'
import { ReactNode } from 'react'

export const GenerationSelector = ({
  children,
  className,
  variant = 'secondary',
}: { children?: ReactNode; className?: string; variant?: ButtonProps['variant'] }) => {
  const [gen, setGen] = useSearchParamState('gen', '1')

  const gens = Array(PKM_LATEST_GENERATION)
    .fill(0)
    .map((_, i) => String(i + 1))

  const buttonText = children ?? `Generation ${gen}`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant={variant} className={className}>
          {buttonText}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Change Generation:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={gen} onValueChange={setGen}>
          {gens.map((gen) => (
            <DropdownMenuRadioItem className="pr-2" key={`gen-${gen}`} value={gen}>
              Generation {gen}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
