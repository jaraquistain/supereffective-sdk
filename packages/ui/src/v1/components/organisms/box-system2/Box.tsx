import { cn } from '@r1stack/cn'
import type { ReactNode } from 'react'

import type { GenericBoxCell } from '@supeffective/dextracker'

import type { PropsOf } from '@/v1/components/utility'
import { css } from '@/v1/css'

export type BoxProps<D extends GenericBoxCell = GenericBoxCell> = {
  data: Array<D>
  header?: ReactNode
  cellRenderer: (cell: D) => ReactNode
  columns?: 5 | 6 | 'auto-fill'
  rows?: 4 | 5 | 6 | 'auto-fill'
  children?: ReactNode
} & PropsOf<'div'>

const baseGridClass = css({
  display: 'grid',
  flexWrap: 'wrap',
  // width: '2rem',
  maxWidth: '100%',
  gridAutoFlow: 'dense',
  alignContent: 'stretch',
  alignItems: 'stretch',
  gap: '1rem 0.25rem',
})

// const gridItemClass = css({
//   // flex: '1 1 0%',
//   minWidth: '2rem',
//   maxWidth: '4rem',
// })

const grid5Cols = css({
  gridTemplateColumns: 'repeat(5, minmax(2rem, 1fr))',
})

const grid4Rows = css({
  gridTemplateRows: 'repeat(4, minmax(2rem, 1fr))',
})

const grid6Cols = css({
  gridTemplateColumns: 'repeat(6, minmax(2rem, 1fr))',
})

const grid5Rows = css({
  gridTemplateRows: 'repeat(5, minmax(2rem, 1fr))',
})

const gridAutoCols = css({
  gridTemplateColumns: 'repeat(auto-fill, minmax(4rem, 1fr))',
})

const gridAutoRows = css({
  gridTemplateRows: 'repeat(auto-fill, minmax(4rem, 1fr))', // or unset?
})

export function BoxTitle(props: PropsOf<'div'>) {
  const { children, className, ...rest } = props

  return (
    <div
      className={cn(
        css({
          fontSize: '1rem',
          padding: '0.5rem',
          fontWeight: '600',
          lineHeight: '1',
          width: '75%',
          display: 'inline-block',
          rounded: '1.25rem',
          bg: 'cBg',
          color: 'cText',
        }),
        className,
        'pk-box-header-title',
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export function Box<D extends GenericBoxCell = GenericBoxCell>(props: BoxProps<D>): JSX.Element {
  const { className, header, data, columns = 'auto-fill', rows = 'auto-fill', cellRenderer, children, ...rest } = props

  const hasHeader = typeof header !== 'undefined'
  const isTitleHeader = typeof header === 'string'

  function _renderTitle() {
    if (!isTitleHeader) return header

    return <BoxTitle>{header}</BoxTitle>
  }

  function _renderHeader() {
    if (!hasHeader) return null

    return (
      <div
        className={cn(
          css({
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            roundedTop: '1.5rem',
            bg: '#37AEA5',
            padding: '1rem',
            textAlign: 'center',
          }),
          'pk-box-header',
        )}
      >
        {_renderTitle()}
      </div>
    )
  }

  function _renderBody() {
    return (
      <div
        className={cn(
          css({
            position: 'relative',
            padding: '0.5rem',
            border: '2px solid #37AEA5',
            roundedBottom: '1.5rem',
            background: '#F8FFF9',
            _dark: {
              // border: '2px solid #37AEA5',
              // background: '#0a1214',
              background: 'cBg',
              color: 'cText',
            },
          }),
          [!hasHeader, css({ roundedTop: '1.5rem', paddingTop: '1rem' })],
          baseGridClass,
          [columns === 5, grid5Cols],
          [columns === 6, grid6Cols],
          [columns === 'auto-fill', gridAutoCols],
          [rows === 4, grid4Rows],
          [rows === 5, grid5Rows],
          [rows === 'auto-fill', gridAutoRows],
          'pk-box-body',
        )}
      >
        {data.map((cell, _i) => cellRenderer(cell))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        css({
          position: 'relative',
          flexDirection: 'column',
          rounded: '1.5rem',
          boxShadow: '2px 2px 10px rgba(0,0,0,.2)',
          color: 'cText',
        }),
        // [!hasHeader, css({ roundedTop: '1.5rem' })],
        className,
        'pk-box',
      )}
      {...rest}
    >
      {_renderHeader()}
      {_renderBody()}
      {children}
    </div>
  )
}
