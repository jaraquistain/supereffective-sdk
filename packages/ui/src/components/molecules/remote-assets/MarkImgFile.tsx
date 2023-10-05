import { PKM_DEFAULT_ASSETS_URL } from '../../../constants'
import { AssetImgFile, AssetImgProps } from './AssetImgFile'

export type MarkImgFileProps = {
  variant?: 'gen9-style'
} & AssetImgProps

export function MarkImgFile({
  baseUrl = PKM_DEFAULT_ASSETS_URL,
  variant = 'gen9-style',
  baseWidth = 64,
  baseHeight = 64,
  ...rest
}: MarkImgFileProps): JSX.Element {
  const newBaseUrl = `${baseUrl}/images/marks/${variant}`

  return <AssetImgFile baseUrl={newBaseUrl} baseWidth={baseWidth} baseHeight={baseHeight} {...rest} />
}
