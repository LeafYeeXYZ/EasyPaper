import { create } from 'zustand'
import { MarkdownPaperTheme, APS } from '../../../../resources/lib/theme'

interface State {
  disabled: boolean
  setDisabled: (disabled: boolean) => void
  theme: MarkdownPaperTheme
  setTheme: (theme: MarkdownPaperTheme) => void
  markdown: string
  setMarkdown: (markdown: string) => void
}

export const useStore = create<State>()((set) => ({
  disabled: false,
  setDisabled: (disabled): void => set({ disabled }),
  theme: APS,
  setTheme: (theme): void => set({ theme }),
  markdown: '',
  setMarkdown: (markdown): void => set({ markdown })
}))
