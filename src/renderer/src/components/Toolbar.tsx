import { Button, Select } from 'antd'
import {
  FileAddOutlined,
  FolderOpenOutlined,
  SaveOutlined,
  QuestionCircleOutlined,
  FileMarkdownOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  FileWordOutlined
} from '@ant-design/icons'
import { useStore } from '../lib/useStore'

export default function Toolbar(): JSX.Element {
  const { filepath, filename, setFilename, setFilepath, setMarkdown, messageApi, markdown } =
    useStore()
  return (
    <div className="h-full w-full flex justify-start items-center gap-2 px-2">
      <Button
        type={filepath && filename ? 'default' : 'primary'}
        onClick={async () => {
          const { filename, filepath } = await window.api.newPaper()
          setFilename(filename)
          setFilepath(filepath)
        }}
      >
        <FileAddOutlined /> 新建
      </Button>
      <Button
        type={filepath && filename ? 'default' : 'primary'}
        onClick={async () => {
          const { filename, filepath, content } = await window.api.openPaper()
          setFilename(filename)
          setFilepath(filepath)
          setMarkdown(content)
        }}
      >
        <FolderOpenOutlined /> 打开
      </Button>
      <Button
        disabled={!filepath || !filename || !markdown.length || !messageApi}
        onClick={async () => {
          await window.api
            .savePaper(filepath, filename, markdown)
            .then(() => messageApi!.success('保存成功'))
            .catch(() => messageApi!.error('保存失败'))
        }}
      >
        <SaveOutlined /> 保存
      </Button>
      <Button
        onClick={() => {
          window.api.openBrowser('https://github.com/LeafYeeXYZ/EasyPaper')
        }}
      >
        <QuestionCircleOutlined /> 帮助
      </Button>
      <p className="text-xs px-1 font-bold text-nowrap text-gray-600">导出:</p>
      <Button disabled>
        <FileMarkdownOutlined /> Markdown
      </Button>
      <Button disabled>
        <FilePdfOutlined /> PDF
      </Button>
      <Button disabled>
        <FileTextOutlined /> HTML
      </Button>
      <Button disabled>
        <FileWordOutlined /> Word
      </Button>
      <p className="text-xs px-1 font-bold text-nowrap text-gray-600">论文格式:</p>
      <Select defaultValue="aps">
        <Select.Option value="aps">心理学报</Select.Option>
      </Select>
      &nbsp;
    </div>
  )
}
