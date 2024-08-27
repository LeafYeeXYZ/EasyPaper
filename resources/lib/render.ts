import { marked } from 'marked'
import { MarkdownPaperTheme } from './theme'

export async function mdToHtml(md: string, theme: MarkdownPaperTheme): Promise<string> {
  let content: string
  content = await theme.preParseMarkdown(md)
  content = await marked(content)
  content = await theme.preParseHTML(content)
  return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <title>预览</title>
      <style>${theme.css}</style>
      <style>
        * { scrollbar-width: none; }
      </style>
    </head>
    <body>
      ${content}
    </body>
    </html>
  `
}
