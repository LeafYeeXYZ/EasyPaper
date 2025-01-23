import Editor from './components/Editor'
import Preview from './components/Preview'
import Toolbar from './components/Toolbar'
import { ConfigProvider, message, notification, theme, type ThemeConfig } from 'antd'
import { useStore } from './lib/useStore'
import { useEffect, useState } from 'react'

const ANTD_THEME_LIGHT: ThemeConfig = {
  token: {
    colorPrimary: '#ff8080',
    colorText: '#4c0519'
  }
}

const ANTD_THEME_DARK: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#ff8080',
    colorText: '#ffffff'
  }
}

function App(): JSX.Element {
  const { setMessageApi, setNotificationApi } = useStore()
  const [messageApi, messageContextHolder] = message.useMessage()
  useEffect(() => {
    setMessageApi(messageApi)
  }, [messageApi, setMessageApi])
  const [notificationApi, notificationContextHolder] = notification.useNotification()
  useEffect(() => {
    setNotificationApi(notificationApi)
  }, [notificationApi, setNotificationApi])
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  useEffect(() => {
    const systemTheme: 'light' | 'dark' =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    setTheme(systemTheme)
  }, [])
  return (
    <main
      className={
        'w-dvw h-dvh absolute grid grid-rows-[3rem_1fr] overflow-hidden bg-white dark:bg-gray-950' +
        (theme === 'dark' ? ' dark' : '')
      }
    >
      <ConfigProvider theme={theme === 'light' ? ANTD_THEME_LIGHT : ANTD_THEME_DARK}>
        <div className="overflow-auto" style={{ scrollbarWidth: 'none' }}>
          <Toolbar />
        </div>
        <div className="grid grid-cols-2 overflow-hidden" style={{ scrollbarWidth: 'none' }}>
          <Preview />
          <Editor />
        </div>
        {messageContextHolder}
        {notificationContextHolder}
      </ConfigProvider>
    </main>
  )
}

export default App
