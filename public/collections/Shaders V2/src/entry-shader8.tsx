import React from 'react'
import ReactDOM from 'react-dom/client'
import VortexDemo from '../shaders/Shader 8/shader'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <VortexDemo />
    </React.StrictMode>
)
