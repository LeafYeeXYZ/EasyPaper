import Editor from './components/Editor'
import Preview from './components/Preview'
import Toolbar from './components/Toolbar'
import { ConfigProvider, message } from 'antd'
import { useStore } from './lib/useStore'
import { useEffect } from 'react'

function App(): JSX.Element {
  const [messageApi, contextHolder] = message.useMessage()
  const { setMessageApi } = useStore()
  useEffect(() => {
    setMessageApi(messageApi)
  }, [messageApi, setMessageApi])
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
        {contextHolder}
      </ConfigProvider>
    </main>
  )
}

export default App
