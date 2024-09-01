import { marked } from 'marked'
import { MarkdownPaperTheme } from './theme'
import markedKatex from 'marked-katex-extension'
// 使用 from 'katex/dist/katex.css?raw' 会报错
import katexCss from './katex.css?raw'

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
      <style>${`\n${katexCss}\n`}</style>
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
