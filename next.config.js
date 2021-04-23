module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/movie/PopularM',
        destination: '/' // Proxy to Backend
      }
    ]
  }
}



const withImages = require('next-images')
module.exports = withImages({
  webpack(config, options) {
    return config
  }
})

