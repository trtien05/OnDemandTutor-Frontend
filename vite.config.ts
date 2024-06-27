import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ['sockjs-client'],
    },
    define: {
        global: 'window', // Define global as window for compatibility
    },
});
