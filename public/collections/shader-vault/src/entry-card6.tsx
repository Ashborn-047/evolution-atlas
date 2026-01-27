import React from 'react'
import ReactDOM from 'react-dom/client'
import { SpiralInterfaceCard } from '../shaders/Shader 6/card'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <SpiralInterfaceCard />
    </React.StrictMode>
)
