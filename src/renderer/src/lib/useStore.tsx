import { create } from 'zustand'
import { MarkdownPaperTheme, APS } from '../../../../resources/lib/theme'
import type { MessageInstance } from 'antd/es/message/interface'

interface State {
  disabled: boolean
  setDisabled: (disabled: boolean) => void
  theme: MarkdownPaperTheme
  setTheme: (theme: MarkdownPaperTheme) => void
  markdown: string
  setMarkdown: (markdown: string) => void
  filepath: string
  setFilepath: (filepath: string) => void
  filename: string
  setFilename: (filename: string) => void
  messageApi: MessageInstance | null
  setMessageApi: (messageApi: MessageInstance) => void
}

export const useStore = create<State>()((set) => ({
  disabled: false,
  setDisabled: (disabled): void => set({ disabled }),
  theme: APS,
  setTheme: (theme): void => set({ theme }),
  markdown: '',
  setMarkdown: (markdown): void => set({ markdown }),
  filepath: '',
  setFilepath: (filepath): void => set({ filepath }),
  filename: '',
  setFilename: (filename): void => set({ filename }),
  messageApi: null,
  setMessageApi: (messageApi): void => set({ messageApi })
}))
