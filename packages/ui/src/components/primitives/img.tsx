'use client'

import { useEffect, useState } from 'react'
import type { ImgProps, ImgState } from './types'

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
  const { alt, src, fallback, ...rest } = props
  const [originalSrc, setOriginalSrc] = useState<string>(String(src))
  const fallbackSrc = resolveImageSrc(fallback, originalSrc)
  const [currentSrc, setCurrentSrc] = useState<string>(originalSrc)
  const [state, setState] = useState<ImgState>('loading')

  useEffect(() => {
    const newSrc = String(src)
    if (newSrc !== originalSrc) {
      setOriginalSrc(newSrc)
      setCurrentSrc(newSrc)
      setState('loading')
    }
  }, [src, originalSrc])

  return (
    <img
      src={currentSrc}
      loading={currentSrc === originalSrc ? rest.loading : undefined}
      data-state={state}
      onLoad={() => {
        setState('loaded')
      }}
      onError={(e) => {
        if (!fallbackSrc) {
          return
        }

        if (e.currentTarget.src === fallbackSrc) {
          console.error(`Failed to load fallback image: ${originalSrc}`)

          return
        }

        setCurrentSrc(fallbackSrc)
        setState('error')
      }}
      {...rest}
      alt={alt || ''}
    />
  )
}
