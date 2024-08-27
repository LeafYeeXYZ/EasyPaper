import { Input } from 'antd'
import { useStore } from '../lib/useStore'

export default function Editor(): JSX.Element {
  const { setMarkdown, filepath, filename, markdown } = useStore()
  return (
    <div className="p-2 pl-1 pt-0 w-full h-full overflow-hidden">
      <div
        className="border w-full h-full p-2 rounded-md shadow-md overflow-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="w-full h-8 p-2 mb-2 border rounded-md shadow-sm bg-gray-50 text-xs text-gray-500 text-ellipsis overflow-hidden text-nowrap">
          <span className="font-bold">
            当前文件: <span className="font-normal">{filename || '...'}</span>
          </span>
        </div>
        <div className="w-full h-8 p-2 mb-2 border rounded-md shadow-sm bg-gray-50 text-xs text-gray-500 text-ellipsis overflow-hidden text-nowrap">
          <span className="font-bold">
            存放位置: <span className="font-normal">{filepath || '...'}</span>
          </span>
        </div>
        <Input.TextArea
          className="h-full w-full"
          placeholder="在这里输入论文内容"
          autoSize={true}
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          onChange={(e) => setMarkdown(e.target.value)}
          disabled={filepath === '' || filename === ''}
          value={markdown}
        />
      </div>
    </div>
  )
}
