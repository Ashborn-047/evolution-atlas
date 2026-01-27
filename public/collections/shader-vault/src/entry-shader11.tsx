import React from 'react'
import ReactDOM from 'react-dom/client'
import PsychedelicVortex from '../shaders/Shader 11/shader'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <PsychedelicVortex />
    </React.StrictMode>
)
