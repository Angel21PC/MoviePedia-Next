const withImages = require('next-images')
module.exports = {
  async headers() {
    return [
      {
        source: '/umami.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000', // 30 days
          },
        ],
      },
    ];
  },
}