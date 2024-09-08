import { Input } from 'antd'
import { useStore } from '../lib/useStore'
import { useRef } from 'react'

export default function Editor(): JSX.Element {
  const timer = useRef<NodeJS.Timeout | null>(null)
  const debounce = (fn: () => void, delay: number): void => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      fn()
    }, delay)
  }
  const {
    setMarkdown,
    filepath,
    filename,
    markdown,
    disabled,
    autoSave,
    notificationApi,
    setSavedMarkdown,
    messageApi,
    getNotificationConfig
  } = useStore()
  return (
    <div className="p-2 pl-1 pt-0 w-full h-full overflow-hidden">
      <div
        className="border w-full h-full p-2 rounded-md shadow-md overflow-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="w-full h-8 p-2 mb-2 border rounded-md shadow-sm bg-gray-50 text-xs text-gray-500 text-ellipsis overflow-hidden text-nowrap">
          <span className="font-bold">
            当前文件:&nbsp;&nbsp;
            <span className="font-normal">{filename || '...'}</span>
          </span>
        </div>
        <div className="w-full h-8 p-2 mb-2 border rounded-md shadow-sm bg-gray-50 text-xs text-gray-500 text-ellipsis overflow-hidden text-nowrap">
          <span className="font-bold">
            存放位置:&nbsp;&nbsp;
            <span className="font-normal">{filepath || '...'}</span>
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
          onChange={(e) => {
            // 无操作 1S 后保存
            autoSave &&
              debounce(async () => {
                await window.api
                  .savePaper(filepath, filename, e.target.value)
                  .then(() => {
                    setSavedMarkdown(e.target.value)
                    notificationApi?.success(getNotificationConfig())
                  })
                  .catch(() => messageApi?.error('保存失败'))
              }, 1500)
            setMarkdown(e.target.value)
          }}
          disabled={filepath === '' || filename === '' || disabled}
          value={markdown}
        />
      </div>
    </div>
  )
}
