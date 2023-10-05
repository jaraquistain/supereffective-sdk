import { type ReactNode, useEffect } from 'react'

import { SLCoreAddon, useStoryLiteStore } from '@storylite/storylite'

export function StoryWrapper({
  theme,
  children,
}: {
  theme?: 'light' | 'dark' | 'auto'
  children: ReactNode
}) {
  const params = useStoryLiteStore((state) => state.parameters)
  const themeParam = params[SLCoreAddon.ColorScheme]?.value
  const resolvedTheme = theme ?? String(themeParam) ?? 'auto'

  useEffect(() => {
    document.body.dataset.theme = resolvedTheme
    if (resolvedTheme !== 'auto') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => {
      const isDark = mediaQuery.matches
      document.body.dataset.theme = isDark ? 'dark' : 'light'
    }

    mediaQuery.addEventListener('change', listener)
    listener()

    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  }, [resolvedTheme])

  return <div className="dex-tracker-ui dex-tracker-story-wrapper">{children}</div>
}
