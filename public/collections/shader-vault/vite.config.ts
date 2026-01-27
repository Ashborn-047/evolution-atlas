import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    base: './',
    plugins: [react()],
    resolve: {
        alias: {
            'react': path.resolve(__dirname, 'node_modules/react'),
            'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                // Shader fullscreen pages
                shaderFull1: path.resolve(__dirname, 'shaders/Shader 1/shader.html'),
                shaderFull2: path.resolve(__dirname, 'shaders/Shader 2/shader.html'),
                shaderFull3: path.resolve(__dirname, 'shaders/Shader 3/shader.html'),
                shaderFull4: path.resolve(__dirname, 'shaders/Shader 4/shader.html'),
                shaderFull5: path.resolve(__dirname, 'shaders/Shader 5/shader.html'),
                shaderFull6: path.resolve(__dirname, 'shaders/Shader 6/shader.html'),
                shaderFull7: path.resolve(__dirname, 'shaders/Shader 7/shader.html'),
                shaderFull8: path.resolve(__dirname, 'shaders/Shader 8/shader.html'),
                shaderFull9: path.resolve(__dirname, 'shaders/Shader 9/shader.html'),
                shaderFull10: path.resolve(__dirname, 'shaders/Shader 10/shader.html'),
                shaderFull11: path.resolve(__dirname, 'shaders/Shader 11/shader.html'),
                // Card experiment pages
                shaderCard1: path.resolve(__dirname, 'shaders/Shader 1/card.html'),
                shaderCard2: path.resolve(__dirname, 'shaders/Shader 2/card.html'),
                shaderCard3: path.resolve(__dirname, 'shaders/Shader 3/card.html'),
                shaderCard4: path.resolve(__dirname, 'shaders/Shader 4/card.html'),
                shaderCard5: path.resolve(__dirname, 'shaders/Shader 5/card.html'),
                shaderCard6: path.resolve(__dirname, 'shaders/Shader 6/card.html'),
                shaderCard7: path.resolve(__dirname, 'shaders/Shader 7/card.html'),
                shaderCard8: path.resolve(__dirname, 'shaders/Shader 8/card.html'),
                shaderCard9: path.resolve(__dirname, 'shaders/Shader 9/card.html'),
                shaderCard10: path.resolve(__dirname, 'shaders/Shader 10/card.html'),
                shaderCard11: path.resolve(__dirname, 'shaders/Shader 11/card.html'),
            }
        }
    }
})
