const uiUrls = {
  dataset: '/dataset',
  assets: '/assets',
}

export function getUiDatasetUrl() {
  return uiUrls.dataset
}

export function getUiAssetsUrl() {
  return uiUrls.assets
}

export function setUiDatasetUrl(url: string) {
  uiUrls.dataset = url
}

export function setUiAssetsUrl(url: string) {
  uiUrls.assets = url
}
