import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import { ClassroomModeProvider } from './contexts/ClassroomModeContext'
import { ThemeProvider } from './contexts/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ClassroomModeProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </ClassroomModeProvider>
    </ThemeProvider>
  </StrictMode>,
)
