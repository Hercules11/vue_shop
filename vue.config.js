module.exports = {
  chainWebpack: (config) => {
    // 链式操作 webpack 配置的。
    // 它根据环境变量 process.env.NODE_ENV 的值来决定是否应用接下来的配置。
    config.when(process.env.NODE_ENV === 'production', (config) => {
      // 清除入口文件并添加生产环境下的主入口文件 main - prod.js。
      config.entry('app').clear().add('./src/main-prod.js')
      // 设置外部依赖，这些依赖将不会被打包，而是在运行时从全局变量中获取
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
      // 通过 tap 方法修改 html - webpack - plugin 插件的配置，给生成的 HTML 模板添加一个 isProd 参数。
      config.plugin('html').tap(args => {
        // 添加参数isProd
        args[0].isProd = true
        return args
      })
    })
    // config.when(process.env.NODE_ENV === 'development', (config) => {
    //   config.entry('app').clear().add('./src/main-dev.js')
    // })

    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap((args) => {
        args[0].isProd = false
        // console.log(args)
        // [
        //   {
        //     title: 'vue_shop',
        //     templateParameters: [Function: templateParameters],
        //     template: 'E:\\past-toy-projects\\vue_shop\\public\\index.html',
        //     isProd: false
        //   }
        // ]
        return args
      })
    })
  },
  publicPath: './'
}


// 当你运行 npm run serve 时：
// npm 会执行 vue - cli - service serve 命令。
// vue - cli - service 内部的 serve 命令在启动 Webpack 开发服务器之前，会做的第一件事就是设置 process.env.NODE_ENV = 'development'。
// 然后，它会加载并执行你的 vue.config.js。此时，process.env.NODE_ENV 的值已经是 'development' 了。
// 当你运行 npm run build 时：
// npm 会执行 vue - cli - service build 命令。
// vue - cli - service 内部的 build 命令在开始打包过程之前，会做的第一件事就是设置 process.env.NODE_ENV = 'production'。
// 然后，它会加载并执行你的 vue.config.js。此时，process.env.NODE_ENV 的值就变成了 'production'。

// 虽然 NODE_ENV 是由命令自动设置的，但 Vue CLI 还提供了.env 文件系统，让你注入其他的环境变量。
// .env: 在所有环境中都会被载入。
// .env.local: 在所有环境中都会被载入，但会被 git 忽略。
// .env.[mode]: (例如.env.development) 只在指定的模式中被载入。
// .env.[mode].local: (例如.env.development.local) 只在指定的模式中被载入，但会被 git 忽略。
