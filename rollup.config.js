import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import path from 'path';
import postcss from "postcss";
import url from "postcss-url";
import pkg from 'rollup-plugin-copy';
import css from "rollup-plugin-import-css";
const copy = pkg;

export default {
    plugins: [
        // Entry point for application build; can specify a glob to build multiple
        // HTML files for non-SPA app
        html({
            input: [path.join(path.resolve(), 'public/views/index.html'), path.join(path.resolve(), 'public/views/cards.html')],
            transformHtml: [ html =>  html.replaceAll('src=".', 'src="/.') ],
            extractAssets: false,
        }), css(),
        // Resolve bare module specifiers to relative paths
        resolve(),
        // Minify HTML template literals,
        // Minify JS
        terser({
            ecma: 2021,
            module: true,
            warnings: true,
        }),
        postcss({
            plugins: [
                url({
                    url: "inline", // enable inline assets using base64 encoding
                    maxSize: 10, // maximum file size to inline (in kilobytes)
                    fallback: "copy", // fallback method to use if max size is exceeded
                }, ),
            ]
        }),
        // Optional: copy any static assets to build directory
        copy({
            targets: [
              { src: 'public/images/*', dest: 'resources/website/images' },
              { src: 'public/styles/*', dest: 'resources/website/styles' }
            ]}
          )
    ],
    output: {
        dir: path.join(path.resolve(), 'resources/website'),
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js'
    },
    preserveEntrySignatures: 'strict',
};