/*
 * @Description: 配置文件
 */
module.exports = {
  publicPath: './',
  devServer: {
    open: true,
    proxy: {
      '/appapi': {
        target: 'http://localhost:3000/', // 本地后端地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/appapi': '/appapi'
        }
      },
      '/api': {
        target: 'http://localhost:3000/', // 本地后端地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}