const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/users',
        permanent: true
      }
    ];
  }
};
