import { getUiAssetsUrl } from '../../../../lib/baseUrls'
import { AssetImgFile, type AssetImgProps } from './AssetImgFile'

export type ItemImgFileProps = {
  variant?: 'gen9-style'
} & AssetImgProps

export function ItemImgFile({
  baseUrl = getUiAssetsUrl(),
  variant = 'gen9-style',
  baseWidth = 64,
  baseHeight = 64,
  ...rest
}: ItemImgFileProps): JSX.Element {
  const newBaseUrl = `${baseUrl}/images/items/${variant}`

  return <AssetImgFile baseUrl={newBaseUrl} baseWidth={baseWidth} baseHeight={baseHeight} {...rest} />
}
