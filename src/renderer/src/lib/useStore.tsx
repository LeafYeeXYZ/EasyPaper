import { create } from 'zustand'
import { MarkdownPaperTheme } from '../../../../lib/theme'
import { getDefalutTheme } from '../../../../lib/utils'
import type { MessageInstance } from 'antd/es/message/interface'
import type { NotificationInstance } from 'antd/es/notification/interface'
import type { CSSProperties } from 'react'

type NotificationConfig = {
  message: string
  placement: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'
  style: CSSProperties
  closable: boolean
  duration: number
}

interface State {
  disabled: boolean
  setDisabled: (disabled: boolean) => void
  theme: MarkdownPaperTheme
  setTheme: (theme: MarkdownPaperTheme) => void
  markdown: string
  setMarkdown: (markdown: string) => void
  savedMarkdown: string
  setSavedMarkdown: (savedMarkdown: string) => void
  filepath: string
  setFilepath: (filepath: string) => void
  filename: string
  setFilename: (filename: string) => void
  messageApi: MessageInstance | null
  setMessageApi: (messageApi: MessageInstance) => void
  notificationApi: NotificationInstance | null
  setNotificationApi: (notificationApi: NotificationInstance) => void
  getNotificationConfig: (message?: string) => NotificationConfig
  autoSave: boolean
  setAutoSave: (autoSave: boolean) => void
}

export const useStore = create<State>()((set) => ({
  // 各种按钮是否禁用
  disabled: false,
  setDisabled: (disabled): void => set({ disabled }),
  // 论文模板
  theme: getDefalutTheme(),
  setTheme: (theme): void => set({ theme }),
  // 当前输入内容
  markdown: '',
  setMarkdown: (markdown): void => set({ markdown }),
  // 本地文件内容
  savedMarkdown: '',
  setSavedMarkdown: (savedMarkdown): void => set({ savedMarkdown }),
  // markdown 文件路径
  filepath: '',
  setFilepath: (filepath): void => set({ filepath }),
  // markdown 文件名
  filename: '',
  setFilename: (filename): void => set({ filename }),
  // 消息
  messageApi: null,
  setMessageApi: (messageApi): void => set({ messageApi }),
  // 通知 (目前只用来显示“已保存”, 其他内容用上面的“消息”)
  notificationApi: null,
  setNotificationApi: (notificationApi): void => set({ notificationApi }),
  getNotificationConfig: (message): NotificationConfig => {
    return {
      message: message ?? '已保存',
      placement: 'bottomLeft',
      style: { margin: '0', padding: '1rem', paddingBottom: '0.5rem' },
      closable: false,
      duration: 0.8
    }
  },
  // 自动保存
  autoSave: localStorage.getItem('autoSave') === 'true',
  setAutoSave: (autoSave): void => {
    localStorage.setItem('autoSave', autoSave.toString())
    set({ autoSave })
  }
}))
