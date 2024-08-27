import { Input } from 'antd'
import { useStore } from '../lib/useStore'

export default function Editor(): JSX.Element {
  const { setMarkdown } = useStore()
  return (
    <div className="p-2 pl-1 pt-0 w-full h-full overflow-hidden">
      <div
        className="border w-full h-full rounded-md shadow-md overflow-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <Input.TextArea
          className="h-full w-full"
          placeholder="在这里输入论文内容"
          autoSize={true}
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </div>
    </div>
  )
}
