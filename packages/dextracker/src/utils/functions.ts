export function getPaddedDexNumber(dexNumber: number): string {
  return dexNumber.toString().padStart(4, '0')
}

export function resolveBoxTitle(gameSet: string, prevTitle: string | null | undefined, currentBoxNum: number): string {
  if (gameSet === 'go' || gameSet === 'lgpe') {
    return prevTitle || 'Storage System'
  }
  if (gameSet === 'la') {
    return prevTitle || `Pasture ${currentBoxNum}`
  }

  return prevTitle || `Box ${currentBoxNum}`
}

export function combineObjects<T = any>(initial: T, ...partials: Partial<T>[]): T {
  return Object.assign({}, initial, ...partials)
}
