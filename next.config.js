const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  serverRuntimeConfig: {
    server_url: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080'
  }
};
