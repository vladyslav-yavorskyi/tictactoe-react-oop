import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    assetsInclude: ['**/*.mp3', '**/*.wav', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.ico', '**/*.json', '**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.eot', '**/*.otf', '**/*.mp4', '**/*.webm', '**/*.ogv', '**/*.md']
})
