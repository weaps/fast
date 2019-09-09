module.exports = {
  assetsDir: 'static',
  publicPath: './',
  devServer: {
    open: 'true',
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://172.31.17.222:8080/zhktBigdata',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '/api': '/'
        }
      }
    }
  }
}
