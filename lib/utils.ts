import { APS, MarkdownPaperTheme } from './theme'

/**
 * 主题列表
 * @important 在 theme.ts 中定义主题后，需要在此处添加
 * @important 请确保默认主题在**第一个**, 即通过 `THEMES[0]` 得到
 */
const THEMES = [APS]

/**
 * 获取主题
 * @param themeName 主题名称
 * @returns 主题对象
 */
export const getTheme = (themeName: string): MarkdownPaperTheme => {
  return THEMES.find((theme) => theme.themeName === themeName) ?? THEMES[0]
}

/**
 * 获取默认主题
 * @returns 默认主题对象
 */
export const getDefalutTheme = (): MarkdownPaperTheme => THEMES[0]

/**
 * 获取主题元数据
 * @returns 主题元数据
 */
export const getThemeMeta = (): { themeName: string; chineseName: string }[] => {
  return THEMES.map((theme) => ({
    themeName: theme.themeName,
    chineseName: theme.chineseName
  }))
}
