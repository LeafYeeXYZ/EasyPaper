import { mdToHtml } from '../../../../lib/render'
import { useStore } from '../lib/useStore'
import { useState, useEffect } from 'react'

// 控制页面跳转到 <span id="markdown_paper_input_target"></span>
const script = `
  <script>
    window.onload = () => {
      document.querySelector('#markdown_paper_input_target')?.scrollIntoView()
      document.body.style.opacity = '1'
    }
  </script>
`

export default function Preview(): JSX.Element {
  const { tagedMarkdown, theme, filepath } = useStore()
  const [html, setHtml] = useState('')
  useEffect(() => {
    mdToHtml(tagedMarkdown, theme)
      .then((html) => window.api.embedImageIntoHtml(html, filepath))
      .then((html) =>
        setHtml(
          html
            .replace('</head>', `${script}</head>`)
            .replace('<body>', '<body style="opacity: 0;">')
        )
      )
  }, [tagedMarkdown, theme, filepath])
  return (
    <div className="p-2 pr-1 pt-0 w-full h-full overflow-hidden">
      <div
        className="border w-full h-full rounded-md shadow-md overflow-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        {tagedMarkdown ? (
          <iframe className="w-full h-full p-8" srcDoc={html} sandbox="allow-scripts" />
        ) : (
          <span className="text-xs text-gray-300 block p-2">论文内容预览</span>
        )}
      </div>
    </div>
  )
}
