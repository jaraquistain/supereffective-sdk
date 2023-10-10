import { Btn as R1Btn, type BtnProps as R1BtnProps } from '@r1stack/react'
import type { HTMLAttributes } from 'react'

import { css } from '@/stylesystem/css'

import { type PressableEvent, usePressable } from '../../hooks/usePressable'

export type BtnProps = Omit<R1BtnProps, 'onClick'> & {
  disabled?: boolean
  /**
   * Alias of onPress
   */
  onClick?: (e: PressableEvent) => void
  onPress?: (e: PressableEvent) => void
  onLongPress?: (e: PressableEvent) => void
  onPressCancel?: (e: PressableEvent) => void
  onPressEnd?: (e: PressableEvent) => void
  onPressing?: (e: PressableEvent) => void
}

export const Btn = ({
  children,
  disabled,
  onClick,
  onPress,
  onLongPress,
  onPressing,
  onPressCancel,
  onPressEnd,
  ...rest
}: BtnProps) => {
  if (onClick && onPress) {
    throw new Error('Cannot use both onClick and onPress')
  }

  const pressable = usePressable({
    disabled,
    onPress: (e) => {
      console.log('press')
      onClick?.(e)
      onPress?.(e)
    },
    onLongPress,
    onPressing,
    onPressEnd,
    onPressCancel,
    resolveTarget(e) {
      const target = e.target as HTMLElement

      return target.dataset?.targetType === 'cell' ? target : null
    },
  })

  return (
    <R1Btn
      className={css({
        border: '1px solid black',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        background: 'gold',
        color: 'black',
        padding: '8px',
      })}
      disabled={disabled}
      {...pressable.props}
      {...(rest as HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>)}
    >
      {children}
    </R1Btn>
  )
}
