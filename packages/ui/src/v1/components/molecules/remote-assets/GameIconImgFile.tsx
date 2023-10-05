import { getUiAssetsUrl } from '../../../../lib/baseUrls'
import { AssetImgFile, type AssetImgProps } from './AssetImgFile'

export type GameIconImgFileProps = {
  variant?: 'icons-circle' | 'icons-square'
} & AssetImgProps

export function GameIconImgFile({
  baseUrl = getUiAssetsUrl(),
  variant = 'icons-circle',
  baseWidth = 64,
  baseHeight = 64,
  ...rest
}: GameIconImgFileProps): JSX.Element {
  const newBaseUrl = `${baseUrl}/images/games/${variant}`

  return <AssetImgFile baseUrl={newBaseUrl} baseWidth={baseWidth} baseHeight={baseHeight} {...rest} />
}
