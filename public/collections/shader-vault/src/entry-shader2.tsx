import React from 'react'
import ReactDOM from 'react-dom/client'
import { DotScreenShader } from '../shaders/Shader 2/shader'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <DotScreenShader />
    </React.StrictMode>
)
