const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [],
  css: {
    extract: {
      filename: 'css/[name].[fullhash:8].css',
      chunkFilename: 'css/[name].[fullhash:8].css'
    },
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/main.scss";`
      },
    },
  },
})
