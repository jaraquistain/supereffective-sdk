import React, { type HTMLAttributes, useEffect, useRef, useState } from 'react'

type NoChildren<T extends HTMLElement> = Omit<HTMLAttributes<T>, 'children'>

type DataAttributes = {
  [key: `data-${string}`]: string | number | boolean | undefined | null | Record<string, unknown> | unknown[]
}

type ItemRefMap<Item = any> = Map<
  string,
  {
    key: string
    value: Item
    ref: React.RefObject<HTMLDivElement>
  }
>

type ItemElementMap<Item = any> = Map<
  string,
  {
    key: string
    value: Item
    target: HTMLDivElement
  }
>

/**
 * Represents a React component that renders an item in the list.
 */
export type ItemFC<Item> = React.FC<{ item: Item }>

export type BaseInfiniteScrollProps<Item> = {
  /**
   * Represents the data of each item in the list.
   */
  items: Item[]
  /**
   * Additional props to apply to each item's wrapper element.
   */
  itemProps?: NoChildren<HTMLDivElement> & DataAttributes
  /**
   * The component to render for each item. It should accept an `item` prop.
   */
  itemComponent: ItemFC<Item>
  /**
   * The component to render as a placeholder for items that are not visible (not painted on the screen)
   */
  placeholderComponent?: ItemFC<Item>
  /**
   * A function that returns a unique key for each item.
   * It is used to identify each item in the list.
   */
  getItemKey: (item: Item) => string
  /**
   * A callback function that is called when the visibility of one or more items changes.
   */
  onItemVisibilityChange?: (entries: ItemElementMap<Item>, container: HTMLDivElement) => void
  /** Whether to apply base inline styles to the container and items. */
  withBaseStyles?: boolean
  /**
   * Additional options to pass to the native IntersectionObserver constructor.
   */
  intersectionObserverOptions?: Omit<IntersectionObserverInit, 'root'>
} & NoChildren<HTMLDivElement>

/**
 * Base inline styles to apply to the container and items.
 */
export const baseInfiniteScrollStyles: Record<string, React.CSSProperties> = {
  container: {
    overflow: 'auto',
  },
  item: {
    contentVisibility: 'auto',
    containIntrinsicSize: 'auto',
  },
}

/**
 * A component that renders a list of items with infinite scrolling.
 */
export function BaseInfiniteScroll<Item>(props: BaseInfiniteScrollProps<Item>) {
  const {
    items,
    itemProps,
    itemComponent: ItemComponent,
    placeholderComponent: PlaceholderComponent,
    getItemKey,
    withBaseStyles = true,
    onItemVisibilityChange,
    intersectionObserverOptions,
    ...rest
  } = props
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefMap = useRef<ItemRefMap<Item>>(new Map())
  const visibleItemMap = useRef<ItemElementMap<Item>>(new Map())
  const [visibleItemKeys, setVisibleItemKeys] = useState<string[]>([])

  const registerRef = (key: string, item: Item, refElement: HTMLDivElement | null) => {
    if (refElement) {
      itemRefMap.current.set(key, { ref: { current: refElement }, key, value: item })
    } else {
      itemRefMap.current.delete(key)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    const isDOMReady = container && itemRefMap.current.size > 0

    if (!isDOMReady) {
      return
    }

    // register intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        let newVisibleItemKeys = visibleItemKeys

        entries.forEach((entry: IntersectionObserverEntry) => {
          const targetElement = entry.target as HTMLDivElement
          const targetKey = targetElement.dataset.key

          if (!targetKey) {
            return
          }

          const refEntry = itemRefMap.current.get(targetKey)

          if (!refEntry) {
            return
          }

          const isPreviouslyVisible = newVisibleItemKeys.includes(refEntry.key)

          if (entry.isIntersecting) {
            targetElement.dataset.intersecting = 'true'
            targetElement.dataset.placeholder = undefined
            visibleItemMap.current.set(targetKey, {
              key: refEntry.key,
              value: refEntry.value,
              target: targetElement,
            })

            if (!isPreviouslyVisible) {
              newVisibleItemKeys = [...newVisibleItemKeys, refEntry.key]
            }
          } else {
            targetElement.dataset.placeholder = 'true'
            targetElement.dataset.intersecting = undefined
            visibleItemMap.current.delete(targetKey)
            if (isPreviouslyVisible) {
              newVisibleItemKeys = newVisibleItemKeys.filter((i) => i !== refEntry.key)
            }
          }
        })

        // only one call to setState
        if (newVisibleItemKeys !== visibleItemKeys) {
          setVisibleItemKeys(newVisibleItemKeys)
          onItemVisibilityChange?.(visibleItemMap.current, container)
        }
      },
      {
        ...intersectionObserverOptions,
        root: container,
      },
    )

    // register all refs with the observer
    itemRefMap.current.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [items, visibleItemKeys])

  const children = items.map((item) => {
    const itemKey = getItemKey(item)

    return (
      <div
        key={itemKey}
        ref={(refElement) => registerRef(itemKey, item, refElement)}
        data-key={itemKey}
        style={withBaseStyles ? baseInfiniteScrollStyles.item : undefined}
        {...itemProps}
      >
        {visibleItemKeys.includes(itemKey) ? (
          <ItemComponent item={item} />
        ) : PlaceholderComponent ? (
          <PlaceholderComponent item={item} />
        ) : null}
      </div>
    )
  })

  return (
    <div style={withBaseStyles ? baseInfiniteScrollStyles.container : undefined} {...rest} ref={containerRef}>
      {children}
    </div>
  )
}
