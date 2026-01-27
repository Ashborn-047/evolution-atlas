import React from 'react'
import ReactDOM from 'react-dom/client'
import ShaderAnimation from '../shaders/Shader 1/shader'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <ShaderAnimation />
    </React.StrictMode>
)
