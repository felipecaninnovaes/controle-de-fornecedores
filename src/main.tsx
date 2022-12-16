import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './global.css'
// import './styles/tableNoWrap.css'

import { appWindow } from '@tauri-apps/api/window'
appWindow.onCloseRequested(() => {
    localStorage.setItem('APP_ACCESS_TOKEN', '')
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App />
)
