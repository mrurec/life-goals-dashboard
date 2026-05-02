import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as JotaiProvider } from 'jotai'
import { RelayEnvironmentProvider } from 'react-relay'
import RelayEnvironment from './relay/RelayEnvironment'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JotaiProvider>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <App />
      </RelayEnvironmentProvider>
    </JotaiProvider>
  </StrictMode>,
)
