import React from 'react'
import ReactDOM from 'react-dom/client'
import SilkDemo from '../shaders/Shader 9/shader'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <SilkDemo />
    </React.StrictMode>
)
