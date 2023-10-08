import { cn } from '@/lib/utils'
import { EditIcon } from 'lucide-react'
import { ComponentPropsWithoutRef } from 'react'

export default function EditSourceLink({
  file,
  repo = 'supereffective-sdk',
  branch = 'main',
  action = 'edit',
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<'a'> & {
  repo?: string
  file: string
  action?: 'edit' | 'tree' | 'blob'
  branch?: string
  children?: React.ReactNode
}) {
  return (
    <span title="Edit on Github" className={cn('flex items-center text-sm', className)}>
      <a
        href={`https://github.com/itsjavi/${repo}/${action}/${branch}/${file}`}
        className={'hover:text-foreground hover:underline'}
        target="_blank"
        rel={'noreferrer'}
        {...rest}
      >
        <EditIcon className="inline-block h-5 w-5" /> {children}
      </a>
    </span>
  )
}
