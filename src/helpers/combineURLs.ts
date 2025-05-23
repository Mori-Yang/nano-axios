export default function combineURLS(baseURL: string, relativeURL: string): string {
  return relativeURL ? `${(baseURL || '').replace(/\/?\/$/, '')}/${relativeURL.replace(/^\/+/, '')}` : relativeURL
}
