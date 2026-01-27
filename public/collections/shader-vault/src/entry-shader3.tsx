import React from 'react'
import ReactDOM from 'react-dom/client'
import MeteorShader from '../shaders/Shader 3/shader'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <MeteorShader />
    </React.StrictMode>
)
