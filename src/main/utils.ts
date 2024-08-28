import { readFileSync } from 'node:fs'
import path from 'node:path'

export async function embedImageIntoHtml(html: string, filepath: string): Promise<string> {
  return html.replace(/<img src="(.+?)"/g, (match, p1) => {
    if (p1.startsWith('http')) return match
    try {
      const url = path.resolve(filepath, decodeURI(p1))
      const data = readFileSync(url).toString('base64')
      return `<img src="data:image/${path.extname(p1).replace('.', '')};base64,${data}"`
    } catch (_) {
      return match
    }
  })
}
