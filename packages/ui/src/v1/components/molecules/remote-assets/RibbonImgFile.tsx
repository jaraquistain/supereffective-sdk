import { getUiAssetsUrl } from '../../../../baseUrls'
import { AssetImgFile, type AssetImgProps } from './AssetImgFile'

export type RibbonImgFileProps = {
  variant?: 'gen9-style'
} & AssetImgProps

export function RibbonImgFile({
  baseUrl = getUiAssetsUrl(),
  variant = 'gen9-style',
  baseWidth = 64,
  baseHeight = 64,
  ...rest
}: RibbonImgFileProps): JSX.Element {
  const newBaseUrl = `${baseUrl}/images/ribbons/${variant}`

  return <AssetImgFile baseUrl={newBaseUrl} baseWidth={baseWidth} baseHeight={baseHeight} {...rest} />
}
