module.exports = {
  async rewrites() {
    return [
      {
        source: 'f/api/movie/PopularM',
        destination: 'https://movie-pedia-next-e0dkngyfb-angel21pc.vercel.app/api/movie/PopularM' // Proxy to Backend
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

