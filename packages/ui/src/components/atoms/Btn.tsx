'use client'

import type { HTMLAttributes } from 'react'

import styles from './Btn.module.scss'

import { type PressableEvent, usePressable } from '../../hooks/usePressable'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type ButtonPropsBase = ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: HTMLButtonElement['type']
  value?: HTMLButtonElement['value']
  // exclude anchor props:
  href?: never
  target?: never
}

type AnchorPropsBase = {
  href: HTMLAnchorElement['href']
  rel?: HTMLAnchorElement['rel']
  target?: HTMLAnchorElement['target']
  // exclude button props:
  type?: never
  value?: never
} & AnchorHTMLAttributes<HTMLAnchorElement>

export type BaseBtnProps = AnchorPropsBase | ButtonPropsBase

/**
 * A basic button component that can be used as either a link or a button,
 * depending if the `href` prop is provided.
 */
export function BaseBtn(props: AnchorPropsBase): JSX.Element
export function BaseBtn(props: ButtonPropsBase): JSX.Element
export function BaseBtn({ children, href, target, rel, ...rest }: BaseBtnProps): JSX.Element {
  if (href !== undefined) {
    const anchorProps = { ...rest, href, target, rel } as AnchorPropsBase

    return (
      <a tabIndex={0} role="button" {...anchorProps}>
        {children}
      </a>
    )
  }

  const buttonProps = rest as ButtonPropsBase

  return (
    <button tabIndex={0} type="button" {...buttonProps}>
      {children}
    </button>
  )
}

export type BtnProps = Omit<BaseBtnProps, 'onClick'> & {
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
    <BaseBtn
      className={styles.btn}
      disabled={disabled}
      {...pressable.props}
      {...(rest as HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>)}
    >
      {children}
    </BaseBtn>
  )
}
