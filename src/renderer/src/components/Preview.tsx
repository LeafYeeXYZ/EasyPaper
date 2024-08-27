import { mdToHtml } from '../../../../resources/lib/render'
import { useStore } from '../lib/useStore'
import { useState, useEffect } from 'react'

export default function Preview(): JSX.Element {
  const { markdown, theme } = useStore()
  const [html, setHtml] = useState('')
  useEffect(() => {
    mdToHtml(markdown, theme).then(setHtml)
  }, [markdown, theme])
  return (
    <div className="p-2 pr-1 pt-0 w-full h-full overflow-hidden">
      <div
        className="border w-full h-full rounded-md shadow-md overflow-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        {markdown ? (
          <iframe className="w-full h-full p-8" srcDoc={html} sandbox="" />
        ) : (
          <span className="text-xs text-gray-300 block p-2">内容预览</span>
        )}
      </div>
    </div>
  )
}
