import { Button, Select, Switch } from 'antd'
import {
  FileAddOutlined,
  FolderOpenOutlined,
  SaveOutlined,
  QuestionCircleOutlined,
  FileMarkdownOutlined,
  FilePdfOutlined,
  FileTextOutlined
} from '@ant-design/icons'
import { useStore } from '../lib/useStore'
import { mdToHtml } from '../../../../lib/render'
import { getTheme, getThemeMeta, getDefalutTheme } from '../../../../lib/utils'
import { flushSync } from 'react-dom'

export default function Toolbar(): JSX.Element {
  const {
    filepath,
    filename,
    setFilename,
    setFilepath,
    setMarkdown,
    messageApi,
    markdown,
    savedMarkdown,
    setSavedMarkdown,
    theme,
    setTheme,
    disabled,
    setDisabled,
    setAutoSave,
    autoSave,
    notificationApi,
    getNotificationConfig
  } = useStore()
  return (
    <div className="h-full w-full flex justify-start items-center gap-2 px-2">
      <Button
        type={filepath && filename ? 'default' : 'primary'}
        disabled={disabled}
        onClick={async () => {
          const { filename, filepath } = await window.api.newPaper()
          setFilename(filename)
          setFilepath(filepath)
          setMarkdown('')
          setSavedMarkdown('')
        }}
      >
        <FileAddOutlined /> 新建
      </Button>
      <Button
        type={filepath && filename ? 'default' : 'primary'}
        disabled={disabled}
        onClick={async () => {
          const { filename, filepath, content } = await window.api.openPaper()
          setFilename(filename)
          setFilepath(filepath)
          setMarkdown(content)
          setSavedMarkdown(content)
        }}
      >
        <FolderOpenOutlined /> 打开
      </Button>
      <Button
        type={markdown === savedMarkdown ? 'default' : 'primary'}
        disabled={!filepath || !filename || !markdown.length || !messageApi || disabled}
        onClick={async () => {
          await window.api
            .savePaper(filepath, filename, markdown)
            .then(() => {
              setSavedMarkdown(markdown)
              notificationApi?.success(getNotificationConfig())
            })
            .catch(() => messageApi!.error('保存失败'))
        }}
      >
        <SaveOutlined /> 保存
      </Button>
      <Button
        disabled={disabled}
        onClick={async () => {
          await window.api.openBrowser('https://github.com/LeafYeeXYZ/EasyPaper')
        }}
      >
        <QuestionCircleOutlined /> 帮助
      </Button>
      <p className="text-xs px-1 font-bold text-nowrap text-gray-600">导出:</p>
      <Button
        disabled={!filepath || !filename || !markdown.length || !messageApi || disabled}
        onClick={async () => {
          await window.api
            .createTextFile(markdown, 'md', filename.split('.')[0])
            .then((res) => res && messageApi!.success('导出成功'))
            .catch(() => messageApi!.error('导出失败'))
        }}
      >
        <FileMarkdownOutlined /> Markdown
      </Button>
      <Button
        disabled={!filepath || !filename || !markdown.length || !messageApi || disabled}
        onClick={async () => {
          flushSync(() => setDisabled(true))
          messageApi!.open({
            content: '导出中...',
            type: 'loading',
            duration: 0,
            key: 'exporting'
          })
          await window.api
            .createPdf(markdown, theme.themeName, filepath, filename)
            .then((res) => {
              messageApi!.destroy()
              res && messageApi!.success('导出成功')
            })
            .catch(() => {
              messageApi!.destroy()
              messageApi!.error('导出失败')
            })
            .finally(() => setDisabled(false))
        }}
      >
        <FilePdfOutlined /> PDF
      </Button>
      <Button
        disabled={!filepath || !filename || !markdown.length || !messageApi || disabled}
        onClick={async () => {
          const html = await window.api.embedImageIntoHtml(
            await mdToHtml(markdown, theme),
            filepath
          )
          await window.api
            .createTextFile(html, 'html', filename.split('.')[0])
            .then((res) => res && messageApi!.success('导出成功'))
            .catch(() => messageApi!.error('导出失败'))
        }}
      >
        <FileTextOutlined /> HTML
      </Button>
      <p className="text-xs px-1 font-bold text-nowrap text-gray-600">论文格式:</p>
      <Select
        defaultValue={getDefalutTheme().themeName}
        disabled={disabled}
        onChange={(value) => setTheme(getTheme(value))}
      >
        {getThemeMeta().map((theme) => (
          <Select.Option key={theme.themeName} value={theme.themeName}>
            {theme.chineseName}
          </Select.Option>
        ))}
      </Select>
      <p className="text-xs px-1 font-bold text-nowrap text-gray-600">设置:</p>
      <Switch
        checkedChildren="自动保存"
        unCheckedChildren="自动保存"
        checked={autoSave}
        className="min-w-max"
        onChange={(checked) => {
          if (checked) {
            setAutoSave(true)
            if (savedMarkdown !== markdown) {
              window.api
                .savePaper(filepath, filename, markdown)
                .then(() => {
                  setSavedMarkdown(markdown)
                  notificationApi?.success(getNotificationConfig())
                })
                .catch(() => messageApi!.error('保存失败'))
            }
          } else {
            setAutoSave(false)
          }
        }}
      />
      &nbsp;
    </div>
  )
}
