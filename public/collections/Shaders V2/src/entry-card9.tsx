import React from 'react'
import ReactDOM from 'react-dom/client'
import SilkCardDemo from '../shaders/Shader 9/card'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <SilkCardDemo />
    </React.StrictMode>
)
