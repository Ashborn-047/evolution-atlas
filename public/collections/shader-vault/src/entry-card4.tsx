import React from 'react'
import ReactDOM from 'react-dom/client'
import AuroraCard from '../shaders/Shader 4/card'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <AuroraCard />
    </React.StrictMode>
)
