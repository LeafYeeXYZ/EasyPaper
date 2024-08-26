import { Input } from 'antd'

export default function Editor(): JSX.Element {
  return (
    <div className="pr-2 pl-1 pb-3 w-full h-full">
      <Input.TextArea
        className="h-full w-full"
        placeholder="在这里输入论文内容"
        autoSize={{ minRows: 10 }}
      />
    </div>
  )
}
