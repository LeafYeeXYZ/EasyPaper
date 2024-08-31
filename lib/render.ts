import { marked } from 'marked'
import { MarkdownPaperTheme } from './theme'
import markedKatex from 'marked-katex-extension'
import katexCss from 'katex/dist/katex.css?raw'

export async function mdToHtml(md: string, theme: MarkdownPaperTheme): Promise<string> {
  let content: string
  marked.use(markedKatex({ throwOnError: false }))
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
      <style>${`\n${katexCss}`}</style>
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
