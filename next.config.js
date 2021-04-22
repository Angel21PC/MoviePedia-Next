const withImages = require('next-images')
module.exports = withImages({
  webpack(config, options) {
    return config
  }
})

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://movie-pedia-next-e0dkngyfb-angel21pc.vercel.app/api/:path*' // Proxy to Backend
      }
    ]
  }
}