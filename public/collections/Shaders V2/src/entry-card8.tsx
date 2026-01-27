import React from 'react'
import ReactDOM from 'react-dom/client'
import VortexProfileCard from '../shaders/Shader 8/card'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <VortexProfileCard />
    </React.StrictMode>
)
