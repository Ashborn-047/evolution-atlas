import React from 'react'
import ReactDOM from 'react-dom/client'
import FlickeringGridDemo from '../shaders/Shader 5/shader'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <FlickeringGridDemo />
    </React.StrictMode>
)
