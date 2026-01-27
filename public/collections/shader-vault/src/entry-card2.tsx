import React from 'react'
import ReactDOM from 'react-dom/client'
import DotScreenCard from '../shaders/Shader 2/card'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <DotScreenCard />
    </React.StrictMode>
)
