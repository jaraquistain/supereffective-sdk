import { cn } from '@r1stack/cn'
import { useEffect, useRef, useState } from 'react'

import type { Pokemon } from '@supeffective/dataset'
import { type ResolvedLivingDexBoxCell, type UpdateLivingDexBoxCell, combineObjects } from '@supeffective/dextracker'

import { type PressableEvent, usePressable } from '../../../hooks/usePressable'
import Cell from './grid-cell'
import classes from './styles/grid-box.styles'
import type { LivingDexGridBoxProps, LivingDexGridCellPressFn } from './types/grid-box.types'

/*

API:

1. We load 100 elements initially
2. Calculate the average width and height of the elements to know the margins 
  we need to add when scrolling
3. When we scroll to the bottom, we load 100 more elements
4. Remove the elements that are not visible anymore
5. On scroll up, we load 100 more elements and remove the ones that are not visible
 * 
 */

export default function Box({
  pokedex: pokemon,
  cells: storableCells,
  box,
  onCellPress,
  onCellLongPress,
  displayOptions = {
    sprites: true,
    types: false,
    numbers: true,
    names: true,
    uncaught: false,
    indicators: true,
    view: 'unified',
  },
  ...rest
}: LivingDexGridBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null)
  const [boxHeight, setBoxHeight] = useState<number | undefined>(undefined)
  const [isRendered, setIsRendered] = useState(false)
  const pokemonByNid = new Map<string, Pokemon>(pokemon.map((p) => [p.nid, p]))
  const updateHeightTimer = useRef<number | null>(null)
  const setIsRenderedTimer = useRef<number | null>(null)
  const [cells, setCells] = useState<ResolvedLivingDexBoxCell[]>(
    storableCells.map((cell): ResolvedLivingDexBoxCell => {
      const pokeRecord = cell.pokemonId ? pokemonByNid.get(cell.pokemonId) : undefined

      if (cell.pokemonId && pokeRecord === undefined) {
        throw new Error(`Could not find pokemon with nid: ${cell.pokemonId}`)
      }
      if (!pokeRecord) {
        throw new Error(`NEEDS REFACTORING: No pokemon found for cell: ${cell.uid}`)
      }

      return {
        uid: cell.uid,
        position: cell.position,
        state: cell.state,
        pokemon: pokeRecord,
      }
    }),
  )

  // const cellsByIndex = new Map<number, ResolvedLivingDexBoxCell>(cells.map((cell, i) => [i, cell]))

  const setCellFn: Parameters<LivingDexGridCellPressFn>[2] = (
    cell: ResolvedLivingDexBoxCell,
    cellUpdate: UpdateLivingDexBoxCell,
  ) => {
    setCells((prev) => {
      const index = prev.findIndex((c) => c.uid === cell.uid)
      if (index === -1) {
        console.error('Could not find cell to update', cell.uid, cell)

        return prev
      }
      const next = [...prev]
      const existingCell = next[index]

      if (!existingCell) {
        throw new Error(`Could not find cell to update: ${cell.uid}`)
      }

      const newCell: ResolvedLivingDexBoxCell = {
        ...existingCell,
        ...cellUpdate,
        state: combineObjects(existingCell.state, cellUpdate.state),
      }

      next[index] = newCell
      console.log('UPDATE CELL', cell.uid, newCell.state)

      return next
    })
  }

  const handlePress = (e: PressableEvent) => {
    if (!e.resolvedTarget || !(e.resolvedTarget.dataset.targetType === 'cell')) {
      return
    }
    const uid = e.resolvedTarget.getAttribute('data-uid')
    const cell = cells.find((c) => c.uid === uid)
    if (cell) {
      // console.log('CLICKED ' + e.type, cell.cellData.uid, cell)
      onCellPress?.(cell, box, setCellFn)
    }
  }

  const handleLongPress = (e: PressableEvent) => {
    if (!e.resolvedTarget || !(e.resolvedTarget.dataset.targetType === 'cell')) {
      return
    }
    const uid = e.resolvedTarget.getAttribute('data-uid')
    const cell = cells.find((c) => c.uid === uid)
    if (cell) {
      // console.log('CLICKED ' + e.type, cell.cellData.uid, cell)
      onCellLongPress?.(cell, box, setCellFn)
    }
  }

  const pressable = usePressable({
    onPress: handlePress,
    onLongPress: handleLongPress,
    onPressing: (e) => {
      if (!e.resolvedTarget || !(e.resolvedTarget.dataset.targetType === 'cell')) {
        return
      }
    },
    resolveTarget: (e) => {
      const target = e.target as HTMLElement

      return target.dataset?.targetType === 'cell' ? target : null
    },
    longPressDelay: 500,
    pressEndStateTimeout: 1500,
  })

  useEffect(() => {
    if (!boxRef.current) {
      return
    }

    const setIsRenderedDebounced = (value: boolean) => {
      if (setIsRenderedTimer.current) {
        window.clearTimeout(setIsRenderedTimer.current)
      }

      setIsRenderedTimer.current = window.setTimeout(() => {
        setIsRendered(value)
      }, 100)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) {
          setIsRenderedDebounced(false)

          return
        }
        const isIntersecting = entry.isIntersecting // && entry.intersectionRatio >= 0.8
        setIsRenderedDebounced(isIntersecting)
      },
      {
        root: null,
        rootMargin: undefined,
        threshold: 0.1, // how much visible should the placeholder be? set to 1 to view the placeholder
      },
    )

    observer.observe(boxRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const updateHeight = () => {
      if (!boxRef.current || !isRendered) {
        return
      }

      const height = boxRef.current.clientHeight
      if (height !== boxHeight) {
        setBoxHeight(height)
      }
    }

    const updateHeightDebounced = () => {
      if (updateHeightTimer.current) {
        window.clearTimeout(updateHeightTimer.current)
      }

      updateHeightTimer.current = window.setTimeout(updateHeight, 100)
    }

    updateHeightDebounced()

    window.addEventListener('resize', updateHeightDebounced)

    return () => {
      window.removeEventListener('resize', updateHeightDebounced)
    }
  }, [boxRef.current?.clientHeight])

  const boxBody = (
    <div className={cn(classes.boxBody, 'livingdex-grid-box_body')}>
      {cells.map((cell) => {
        return (
          <Cell
            key={cell.uid}
            data-target-type="cell"
            uid={cell.uid}
            position={cell.position}
            pokemon={cell.pokemon}
            state={cell.state}
            displayOptions={displayOptions}
          />
        )
      })}
    </div>
  )

  const boxDynamicStyles =
    boxHeight && !isRendered
      ? {
          minHeight: `${boxHeight}px`,
        }
      : undefined

  return (
    <div
      {...rest}
      {...pressable.props}
      onContextMenu={(e) => {
        e.preventDefault()

        return false
      }}
      ref={boxRef}
      data-target-type="box"
      data-box={box.position}
      data-intersecting={isRendered}
      data-show-indicators={displayOptions.indicators}
      data-show-uncaught={displayOptions.uncaught}
      className={cn(classes.box, ['livingdex-grid-box'])}
      style={boxDynamicStyles}
    >
      <header className={cn(classes.boxHeader, 'livingdex-grid-box_header')}>
        <div className={classes.boxTitle}>{box.title || `Box ${box.position}`}</div>
      </header>
      {isRendered ? (
        boxBody
      ) : (
        <div className={cn(classes.boxBodyPlaceholder, 'livingdex-grid-box_body--off')}>
          <div className={classes.boxBodyPlaceholderText}>Rendering...</div>
        </div>
      )}
    </div>
  )
}
Box.Cell = Cell
