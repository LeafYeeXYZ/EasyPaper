import Editor from './components/Editor'
import Preview from './components/Preview'
import Toolbar from './components/Toolbar'
import { ConfigProvider, message, notification } from 'antd'
import { useStore } from './lib/useStore'
import { useEffect } from 'react'

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
  return (
    <main className="w-dvw h-dvh absolute grid grid-rows-[3rem,1fr] overflow-hidden">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ff8080',
            colorText: '#4c0519'
          }
        }}
      >
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
