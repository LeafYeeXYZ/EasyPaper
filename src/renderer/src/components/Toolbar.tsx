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
        <QuestionCircleOutlined /> 帮助
      </Button>
      <p className="text-sm px-1 text-nowrap">导出为:</p>
      <Button>
        <FileMarkdownOutlined /> Markdown
      </Button>
      <Button>
        <FilePdfOutlined /> PDF
      </Button>
      <Button>
        <FileTextOutlined /> HTML
      </Button>
      <Button>
        <FileWordOutlined /> Word
      </Button>
      <p className="text-sm px-1 text-nowrap">论文格式:</p>
      <Select defaultValue="aps">
        <Select.Option value="aps">心理学报</Select.Option>
      </Select>
      &nbsp;
    </div>
  )
}
