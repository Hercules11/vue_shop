module.exports = {
  chainWebpack: (config) => {
    config.when(process.env.NODE_ENV === 'production', (config) => {
      config.entry('app').clear().add('./src/main-prod.js')
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        echarts: 'echarts',
        lodash: '_',
        nprogress: 'NProgress',
        'vue-quill-editor': 'VueQuillEditor'
      })
      // 使用配置 html-webpack-plugin 插件 生成发布html入口
      config.plugin('html').tap(args => {
        // 添加参数isProd
        args[0].isProd = true
        return args
      })
    })
    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.entry('app').clear().add('./src/main-dev.js')
    })

    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap((args) => {
        args[0].isProd = false
        return args
      })
    })
  },
  publicPath: './'
}
