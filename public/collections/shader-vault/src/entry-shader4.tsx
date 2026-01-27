import React from 'react'
import ReactDOM from 'react-dom/client'
import AuroraShaderDemo from '../shaders/Shader 4/shader'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <AuroraShaderDemo />
    </React.StrictMode>
)
