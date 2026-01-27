import React from 'react'
import ReactDOM from 'react-dom/client'
import { DottedSurfaceCard } from '../shaders/Shader 7/card'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <DottedSurfaceCard />
    </React.StrictMode>
)
