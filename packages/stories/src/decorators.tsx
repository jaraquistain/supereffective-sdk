import type { CSSProperties } from 'react'

import type { PropsOf } from '@supeffective/ui'

export function DecoFlex(props: PropsOf<'div'>) {
  const { children, style, className, ...rest } = props
  const divStyles: CSSProperties = Object.assign(
    {},
    {
      display: 'flex',
      flexWrap: 'wrap',
      // gridTemplateColumns: 'repeat(auto-fill, minmax(24px, 1fr))',
      gap: '1rem',
      alignContent: 'flex-end',
      alignItems: 'flex-end',
      marginBottom: '1rem',
    },
    style,
  )
  const classes = [className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest} style={divStyles}>
      {children}
    </div>
  )
}

export function DecoGrid(props: PropsOf<'div'> & { columns?: number | string; minWidth?: string }) {
  const { children, style, className, columns = 6, minWidth = '64px', ...rest } = props
  const divStyles: CSSProperties = Object.assign(
    {},
    {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, minmax(${minWidth}, 1fr))`,
      gridAutoFlow: 'dense',
      // gridTemplateColumns: 'repeat(auto-fill, minmax(24px, 1fr))',
      gap: '1rem',
      alignContent: 'start',
      alignItems: 'start',
      marginBottom: '1rem',
    },
    style,
  )
  const classes = [className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest} style={divStyles}>
      {children}
    </div>
  )
}

export function DecoWrapper(props: PropsOf<'div'>) {
  const { children, style, className, ...rest } = props
  const divStyles: CSSProperties = Object.assign(
    {},
    {
      padding: '1rem',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '1rem',
    },
    style,
  )
  const classes = ['dex-tracker-ui', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest} style={divStyles}>
      {children}
    </div>
  )
}
