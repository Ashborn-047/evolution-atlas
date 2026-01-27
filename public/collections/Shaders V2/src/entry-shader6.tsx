import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../shaders/Shader 6/shader'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <App />
    </React.StrictMode>
)
