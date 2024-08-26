import { Button } from 'antd'
import {
  FileAddOutlined,
  FolderOpenOutlined,
  SaveOutlined,
  FileMarkdownOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  FileWordOutlined
} from '@ant-design/icons'

export default function Toolbar(): JSX.Element {
  return (
    <div className="h-full w-full flex justify-start items-center gap-2 px-2">
      <Button>
        <FileAddOutlined /> 新建
      </Button>
      <Button>
        <FolderOpenOutlined /> 打开
      </Button>
      <Button>
        <SaveOutlined /> 保存
      </Button>
      <Button>
        <FileMarkdownOutlined /> 导出为 Markdown
      </Button>
      <Button>
        <FilePdfOutlined /> 导出为 PDF
      </Button>
      <Button>
        <FileTextOutlined /> 导出为 HTML
      </Button>
      <Button>
        <FileWordOutlined /> 导出为 Word
      </Button>
    </div>
  )
}
