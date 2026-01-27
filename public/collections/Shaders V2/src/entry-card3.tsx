import React from 'react'
import ReactDOM from 'react-dom/client'
import MeteorShowerCard from '../shaders/Shader 3/card'
import BackButton from './BackButton'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BackButton />
        <MeteorShowerCard />
    </React.StrictMode>
)
