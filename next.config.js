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
          source: 'http://localhost:3000',
          destination: 'https://movie-pedia-next-hkzl3fqlc-angel21pc.vercel.app',
        },
      ]
    },
};