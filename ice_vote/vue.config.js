module.exports = {
    publicPath: './',
    configureWebpack: {
      externals: {
        'vue': 'Vue',
        'Axios':'axios',
        'crypto-js':'CryptoJS'
      }
    },
  }