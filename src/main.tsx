import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import { ClassroomModeProvider } from './contexts/ClassroomModeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClassroomModeProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ClassroomModeProvider>
  </StrictMode>,
)
