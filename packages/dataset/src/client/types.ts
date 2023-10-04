export interface AssetUrlResolver {
  baseUri: string
  resolveUri(relativePath: string): string
}

export interface ImageUrlResolver extends AssetUrlResolver {
  pokemonImg(nid: string, variant?: string, shiny?: boolean): string
  gameImg(id: string, variant?: string): string
  itemImg(id: string, variant?: string): string
  ribbonImg(id: string, variant?: string): string
  markImg(id: string, variant?: string): string
  typeImg(id: string, variant?: string, withBg?: boolean): string
  originMarkImg(id: string): string
}
