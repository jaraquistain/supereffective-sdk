import { PKM_DEFAULT_ASSETS_URL } from '../../../constants'
import { AssetImgFile, type AssetImgProps } from './AssetImgFile'

export type ItemImgFileProps = {
  variant?: 'gen9-style'
} & AssetImgProps

export function ItemImgFile({
  baseUrl = PKM_DEFAULT_ASSETS_URL,
  variant = 'gen9-style',
  baseWidth = 64,
  baseHeight = 64,
  ...rest
}: ItemImgFileProps): JSX.Element {
  const newBaseUrl = `${baseUrl}/images/items/${variant}`

  return <AssetImgFile baseUrl={newBaseUrl} baseWidth={baseWidth} baseHeight={baseHeight} {...rest} />
}
