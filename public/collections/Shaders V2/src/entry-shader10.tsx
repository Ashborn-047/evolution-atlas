import React from 'react'
import ReactDOM from 'react-dom/client'
import RainingLetters from '../shaders/Shader 10/shader'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <RainingLetters />
    </React.StrictMode>
)
