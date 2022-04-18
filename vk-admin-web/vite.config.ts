import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import { viteMockServe } from "vite-plugin-mock"

export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      supportTs: true     //如果使用 js发开，则需要配置 supportTs 为 false
    })
  ],
  server: {
    host: '0.0.0.0',	//解决“vite use `--host` to expose”
    port: 8080,
    open: true
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
})
