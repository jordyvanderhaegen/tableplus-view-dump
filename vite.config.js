import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    build: {
        outDir: 'ViewDump.tableplusplugin',
        lib: {
            entry: resolve(__dirname, 'src/main.js'),
            name: 'TablePlusViewDump',
            fileName: 'main',
        },
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: resolve(__dirname, 'src/manifest.json'),
                    dest: '',
                },
            ],
        }),
    ],
});
