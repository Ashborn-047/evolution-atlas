import React from 'react'
import ReactDOM from 'react-dom/client'
import NeuralInterfaceCard from '../shaders/Shader 1/card'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <NeuralInterfaceCard />
    </React.StrictMode>
)
