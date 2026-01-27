import React from 'react'
import ReactDOM from 'react-dom/client'
import MatrixProfileCard from '../shaders/Shader 10/card'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <MatrixProfileCard />
    </React.StrictMode>
)
