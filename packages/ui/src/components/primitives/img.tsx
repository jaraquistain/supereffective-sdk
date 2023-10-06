import type { ImgProps } from './types'

const resolveImageSrc = (src: string | URL | undefined, defaultSrc: string | URL): string => {
  return src ? (typeof src === 'string' ? src : src.toString()) : resolveImageSrc(defaultSrc, defaultSrc)
}

/**
 * A component for rendering images with fallback, lazy loading and URL object support.
 * Specially useful when you don't know if the image URL is valid or not (e.g. user avatar url)
 *
 * Uses data-state attribute to indicate the state of the image: loading, loaded or error.
 */
export const Img = (props: ImgProps) => {
  const { alt, src, fallback, loading, ...rest } = props
  const originalSrc = String(src)
  const fallbackSrc = resolveImageSrc(fallback, originalSrc)

  return (
    <img
      src={originalSrc}
      loading={loading}
      data-state={'loading'}
      onLoad={(e) => {
        e.currentTarget.setAttribute('data-state', 'loaded')
      }}
      onError={(e) => {
        if (!fallbackSrc) {
          return
        }

        if (e.currentTarget.src === fallbackSrc) {
          console.error(`Failed to load fallback image: ${originalSrc}`)

          return
        }

        e.currentTarget.src = fallbackSrc
        e.currentTarget.setAttribute('data-state', 'error')
      }}
      {...rest}
      alt={alt || ''}
    />
  )
}
