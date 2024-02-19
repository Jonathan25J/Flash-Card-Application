import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import postcss from "postcss";
import url from "postcss-url";
import pkg from 'rollup-plugin-copy';
import css from "rollup-plugin-import-css";
import pkgMinifyHTML from 'rollup-plugin-minify-html-literals';
const copy = pkg;
const minifyHTML = pkgMinifyHTML.default

export default {
    plugins: [
        // Entry point for application build; can specify a glob to build multiple
        // HTML files for non-SPA app
        html({
            input: 'public/views/*.html'
        }), css(),
        // Resolve bare module specifiers to relative paths
        resolve(),
        // Minify HTML template literals
        minifyHTML(),
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
                }),
            ]
        }),
        // Optional: copy any static assets to build directory
        copy()
    ],
    output: {
        dir: 'build/views',
    },
    preserveEntrySignatures: 'strict',
};