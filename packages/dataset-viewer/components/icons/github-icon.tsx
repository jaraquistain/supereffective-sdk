import { ComponentPropsWithoutRef } from 'react'

export function GithubIcon(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 2.25a10 10 0 0 0-3.16 19.48c.5.1.69-.2.69-.47L9.5 19.4c-2.51.46-3.16-.62-3.36-1.18a3.64 3.64 0 0 0-1.03-1.41c-.35-.19-.85-.65 0-.66a2 2 0 0 1 1.53 1.02 2.14 2.14 0 0 0 2.91.83 2.1 2.1 0 0 1 .64-1.34c-2.23-.25-4.55-1.11-4.55-4.94a3.9 3.9 0 0 1 1.02-2.69 3.6 3.6 0 0 1 .1-2.65s.84-.26 2.75 1.03a9.43 9.43 0 0 1 5 0c1.92-1.3 2.75-1.03 2.75-1.03a3.6 3.6 0 0 1 .1 2.65 3.87 3.87 0 0 1 1.03 2.7c0 3.83-2.34 4.68-4.56 4.93a2.37 2.37 0 0 1 .67 1.85l-.01 2.75c0 .26.19.57.69.47A10 10 0 0 0 12 2.25Z"
      />
    </svg>
  )
}