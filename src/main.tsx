import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import { HighContrastModeProvider } from './contexts/HighContrastModeContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { UserProfileProvider } from './contexts/UserProfileContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserProfileProvider>
        <HighContrastModeProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </HighContrastModeProvider>
      </UserProfileProvider>
    </ThemeProvider>
  </StrictMode>,
)
