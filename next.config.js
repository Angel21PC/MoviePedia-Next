const withImages = require('next-images')
module.exports = withImages({
  webpack(config, options) {
    return config
  }
})

const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/api', {
        target: 'https://movie-pedia-next-e0dkngyfb-angel21pc.vercel.app',
        logLevel: 'debug',
        changeOrigin: true
    }));
};