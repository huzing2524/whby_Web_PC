const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_api', resolve('src/api'))
      .set('_assets', resolve('src/assets'))
      .set('_components', resolve('src/components'))
      .set('_views', resolve('src/views'))
      .set('_common', resolve('src/common'))
    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  },
  lintOnSave: true,
  devServer: {
    open: false, //配置自动启动浏览器
    host: '0.0.0.0',
    port: 8080,
    https: false,
    // proxy: 'http://10.10.10.30:8000'
    // proxy: 'http://192.168.2.8:8000'
    proxy: 'https://whby.tenv.dsdiot.com'
    // proxy: 'http://192.168.10.123:9000'
  },
  css: {
    loaderOptions: {
      stylus: {
        'import': [
          path.resolve(__dirname, './src/style/mixin'),
          path.resolve(__dirname, './src/style/_var')
        ],
      }
    }
  }
}
