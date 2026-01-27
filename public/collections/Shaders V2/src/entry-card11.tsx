import React from 'react'
import ReactDOM from 'react-dom/client'
import VortexGallery from '../shaders/Shader 11/card'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <VortexGallery />
    </React.StrictMode>
)
