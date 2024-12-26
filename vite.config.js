import { join } from 'node:path'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // 获取`.env`环境配置文件
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      // 解决 `import { ref , reactive ..... } from 'vue'` 大量引入的问题
      AutoImport({
        imports: ['vue', 'vue-router'], // 自动引入
        eslintrc: {
          enabled: true, // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
        },
      }),
    ],
    resolve: {
      // 配置路径别名
      alias: {
        '@': join(__dirname, 'src'),
        '@api': join(__dirname, 'src/api'),
        '@utils': join(__dirname, 'src/utils'),
      },
    },
    // 反向代理解决跨域问题
    server: {
      host: '0.0.0.0', // 局域网别人也可访问
      port: Number(env.VITE_APP_PORT), // 端口号
      // open: true,// 运行时自动打开浏览器
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_SERVICE_API,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''),
        },
      },
    },
  }
})
