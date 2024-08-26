import Editor from './components/Editor'
import Preview from './components/Preview'
import Toolbar from './components/Toolbar'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <main className="bg-blue-100 w-dvw h-dvh absolute">
      <div>
        <Toolbar />
      </div>
      <div>
        <Editor />
        <Preview />
      </div>
    </main>
  )
}

export default App
