'use client'

import React, { useEffect, useState } from 'react'

export type ImgProps = {
  src: string | URL
  /**
   * Image to show if the main image fails to load. It will fallback to 'src' if not provided.
   */
  fallback?: string | URL
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'>

const resolveImageSrc = (src: string | URL | undefined, defaultSrc: string | URL): string => {
  return src ? (typeof src === 'string' ? src : src.toString()) : resolveImageSrc(defaultSrc, defaultSrc)
}

// function updateView(event) {
//   // Handle the difference in whether the event is fired on the <a> or the <img>
//   const targetIdentifier = event.target.firstChild || event.target

//   const displayNewImage = () => {
//     const mainSrc = `${targetIdentifier.src.split('_th.jpg')[0]}.jpg`
//     galleryImg.src = mainSrc
//     galleryCaption.textContent = targetIdentifier.alt
//   }

//   // Fallback for browsers that don't support View Transitions:
//   if (!document.startViewTransition) {
//     displayNewImage()

//     return
//   }

//   // With View Transitions:
//   const transition = document.startViewTransition(() => displayNewImage())
// }

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
  const [state, setState] = useState<'loading' | 'error' | 'loaded'>('loading')

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
