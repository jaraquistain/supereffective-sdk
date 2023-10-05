import { cn } from '@r1stack/cn'
import { ReactNode } from 'react'

import { CompactPokemon } from '@supeffective/dataset'

import { PokeAvatar, PokeImgFileProps, TypeIcon } from '@/components/molecules'
import { Font, PropsOf, ResponsiveSize } from '@/components/utility'
import { css } from '@/stylesystem/css'

export type PokeAvatarCardDisplayOptions = {
  dexNum?: boolean
  types?: boolean
  name?: boolean
  shinyIcon?: boolean
}

export type PokeAvatarCardProps = {
  pokemon?: CompactPokemon | null
  shiny?: boolean
  font?: Font
  size?: ResponsiveSize
  horizontal?: boolean
  displayOptions?: PokeAvatarCardDisplayOptions
  variant?: PokeImgFileProps['variant']
  children?: ReactNode
} & PropsOf<'span'>

// normal
const cssGradient50pcn = 'radial-gradient(circle, rgba(55, 174, 165, 0.5) 0%, rgba(255, 255, 255, 0) 70%)'
// :hover
const cssGradient50pch = 'radial-gradient(circle, rgba(55, 174, 165, 0.8) 0%, rgba(255, 255, 255, 0) 90%)'
// :active
const cssGradient50pca = 'radial-gradient(circle, rgba(55, 174, 165, 0.4) 0%, rgba(255, 255, 255, 0) 80%)'

// const cvaClasses = cva({
//   base: {
//     width: '4rem',
//     aspectRatio: 1,
//   },
// })

export const defaultDisplayOptions: PokeAvatarCardDisplayOptions = {
  dexNum: true,
  types: true,
  name: true,
  shinyIcon: true,
}

const breakWordWithHyphen = css({
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
  hyphens: 'auto',
  hyphenateCharacter: '"-"',
  hyphenateLimitChars: '6 2 5',
  maxWidth: '100%',
  // margin: '0 auto',
  // display: 'inline-block',
  // overflow: 'hidden',
  // display: '-webkit-box',
  // WebkitLineClamp: 4,
  // WebkitBoxOrient: 'vertical',
  // textOverflow: 'ellipsis',
  lineHeight: '2ch',
  // maxHeight: '4ch',
  // whiteSpace: 'nowrap',
  // overflow: 'hidden',
  // flexWrap: 'wrap',
  // justifyContent: 'center',
  // alignItems: 'center',

  // wordBreak: 'break-all',
})

export function PokeAvatarCard(props: PokeAvatarCardProps): JSX.Element {
  const {
    className,
    pokemon,
    shiny = false,
    horizontal = false,
    size = 'md',
    font = 'mono',
    variant = 'home3d-icon-trimmed',
    children,
    displayOptions = {},
    ...rest
  } = props

  const opts = Object.assign({}, defaultDisplayOptions, displayOptions)

  const infoGap = '0.5rem'
  const flexVertical = css({
    // display: 'grid',
    // gridTemplateRows: 'max-content auto',
    // alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: infoGap,
  })
  const flexHorizontal = css({
    // display: 'grid',
    // gridTemplateColumns: 'max-content auto',
    // alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: infoGap,
  })
  const isVertical = !horizontal
  const flexClass = cn([horizontal, flexHorizontal, flexVertical])
  const hasInfo = opts.dexNum || opts.types || opts.name || children

  function _renderInfos() {
    if (!hasInfo) {
      return null
    }

    const paddedDexNum = pokemon ? pokemon.dexNum.toString().padStart(4, '0') : ''
    const typeTitle = pokemon
      ? [pokemon.type1, pokemon.type2]
          .map((t) => {
            if (!t) {
              return null
            }

            // ucfirst
            return t.charAt(0).toUpperCase() + t.slice(1)
          })
          .filter(Boolean)
          .join(' / ')
      : ''

    return (
      <div
        className={cn(
          css({
            position: 'relative',
            maxWidth: '100%',
            alignContent: 'stretch',

            '&:before': {
              content: '""',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              background: 'linear-gradient(transparent 150px, gray)',
            },
          }),
          flexVertical,
          [
            horizontal,
            css({
              textAlign: 'left',
            }),
          ],
          // [
          //   isVertical,
          //   css({
          //     borderBottom: '2px solid #37AEA5',
          //     paddingBottom: infoGap,
          //     // marginBottom: infoGap,
          //   }),
          // ],
        )}
      >
        {pokemon &&
          opts.dexNum && ( // 10px
            <span className={css({ fontSize: '0.625rem', lineHeight: '1' })}>#{paddedDexNum}</span>
          )}
        {pokemon && opts.types && (
          <span
            title={typeTitle}
            className={cn(
              css({
                display: 'flex',
                gap: '2px',
                // userSelect: 'none',
              }),
              [horizontal, css({ justifyContent: 'flex-start' }), css({ justifyContent: 'center' })],
            )}
          >
            {pokemon.type1 && <TypeIcon title={typeTitle} typeId={pokemon.type1} filled colored size="xs" />}
            {pokemon.type2 && <TypeIcon title={typeTitle} typeId={pokemon.type2} filled colored size="xs" />}
          </span>
        )}
        {pokemon && opts.name && (
          <span
            className={cn(
              css({ fontSize: '0.625rem', flex: 1 }), // 12px
              // breakWordWithHyphen,
              [isVertical, css({ padding: '0 0.25rem' })],
              'hypened',
              css({
                position: 'relative',
                maxWidth: '100%',
                lineHeight: '2ch',
                maxHeight: '6ch',
                // overflow: 'hidden',
                overflowWrap: 'break-word',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word',
                hyphens: 'auto',
                hyphenateCharacter: '"-"',
                hyphenateLimitChars: '4 4 5',
                // whiteSpace: 'nowrap',
              }),
            )}
          >
            {pokemon.name}
          </span>
        )}
        {!pokemon && '&nbsp;'}
        {children}
      </div>
    )
  }

  function _renderBottomLine() {
    if (!hasInfo) {
      return null
    }

    return (
      <hr
        className={cn(
          css({
            margin: '0 auto',
            border: 'none',
            display: 'block',
            width: '80%',
            height: '4px',
            rounded: 'full',
            background: 'linear-gradient(90deg, #ffffff00 0%, #37AEA577 50%, #ffffff00 100%)',
          }),
        )}
      />
    )
  }

  function _renderShinyIcon() {
    const hasShinyIcon = opts.shinyIcon && shiny

    // it should be a sparkle emoji on the top right corner, padded 0.5rem:
    if (!hasShinyIcon) {
      return null
    }

    return (
      <span
        className={cn(
          css({
            position: 'absolute',
            textShadow: '0 0 0.25rem #ffffbb44, 0 0 0.25rem #ffffbb44, 0 0 0.25rem #ffffbb44',
          }),
          [size === 'xs', css({ fontSize: '12px', bottom: '-2px', right: '-2px' })],
          [['sm', 'auto', 'full'].includes(size), css({ fontSize: '14px', bottom: '1px', right: '1px' })],
          [size === 'md', css({ fontSize: '16px', bottom: '2px', right: '2px' })],
          [size === 'lg', css({ fontSize: '18px', bottom: '6px', right: '6px' })],
          [size === 'xl', css({ fontSize: '18px', bottom: '8px', right: '8px' })],
          [horizontal, css({ padding: '0 0.25rem' })],
        )}
      >
        ✨
      </span>
    )
  }

  function _renderAvatar() {
    const hasPokemon = !!pokemon

    return (
      <PokeAvatar
        assetId={pokemon?.nid ?? null}
        rounded
        shiny={shiny}
        size={size}
        title={pokemon?.name ?? ''}
        variant={variant}
        condensed
        filled={hasPokemon}
        hoverable={hasPokemon}
        clickable={hasPokemon}
        className={cn(
          css({
            padding: '0',
            border: '1px solid #37AEA500',
          }),
          [
            hasPokemon,
            css({
              bg: cssGradient50pcn, // cssGradient50pcn
              transitionProperty: 'transform, background, border',
              '&:hover': { bg: cssGradient50pch, border: '2px solid #37AEA544' },
              '&:active': {
                bg: cssGradient50pca,
                border: '1px solid #37AEA566',
              },
            }),
          ],
          [
            !hasPokemon,
            css({
              bg: cssGradient50pcn,
              opacity: '0.3',
            }),
          ],
          [!hasPokemon, 'empty-poke-avatar'],
        )}
      >
        {_renderShinyIcon()}
      </PokeAvatar>
    )
  }

  return (
    <div
      className={cn(
        flexClass,
        css({
          position: 'relative',
          // padding: '8px',
          textAlign: 'center',
          color: 'cTextMuted',
          // alignItems: 'stretch',
          // alignContent: 'stretch',
          // justifyItems: 'space-between',
          width: '100%',
          fontFamily: font,
        }),
        // cvaClasses(),
        [horizontal, css({ justifyItems: 'flex-start', gap: '1rem' }), css({ justifyItems: 'center' })],
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          css({
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: infoGap,
          }),
          [isVertical, css({ flexDirection: 'column' })],
          [horizontal, css({ flexDirection: 'row' })],
        )}
      >
        {_renderAvatar()}
        {_renderInfos()}
      </div>
      {/* {hasInfo && pokemon && _renderBottomLine()} */}
    </div>
  )
}
