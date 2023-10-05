import { getUiAssetsUrl } from '../../../../lib/baseUrls'
import { AssetImgFile, type AssetImgProps } from './AssetImgFile'

export type MarkImgFileProps = {
  variant?: 'gen9-style'
} & AssetImgProps

export function MarkImgFile({
  baseUrl = getUiAssetsUrl(),
  variant = 'gen9-style',
  baseWidth = 64,
  baseHeight = 64,
  ...rest
}: MarkImgFileProps): JSX.Element {
  const newBaseUrl = `${baseUrl}/images/marks/${variant}`

  return <AssetImgFile baseUrl={newBaseUrl} baseWidth={baseWidth} baseHeight={baseHeight} {...rest} />
}
