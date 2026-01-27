import React from 'react'
import ReactDOM from 'react-dom/client'
import DottedSurfaceDemo from '../shaders/Shader 7/shader'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <DottedSurfaceDemo />
    </React.StrictMode>
)
