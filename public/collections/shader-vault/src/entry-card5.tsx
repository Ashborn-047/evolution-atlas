import React from 'react'
import ReactDOM from 'react-dom/client'
import FlickeringGridCard from '../shaders/Shader 5/card'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <FlickeringGridCard />
    </React.StrictMode>
)
