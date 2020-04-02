const { parsed: localEnv } = require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
// const withPWA = require('next-pwa')

const nextConfig = {
  // experimental: {
  //   modern: true,
  //   polyfillsOptimization: true,
  // },

  env: {
    mongo_uri:
      'mongodb+srv://nico:YAsyCpgdoAkOBD02@cluster0-dwm5u.mongodb.net/monjournaldebord?retryWrites=true&w=majority',
    cloudinary_name: 'dl9mctxsb',
    access_token_secret: 'dfdfdf3434344xxcxccx2232',
    refresh_token_secret: 'sfdgfd3454545453435',
  },

  webpack: (config, { isServer }) => {
    config.plugins = config.plugins || []
    // config.plugins.push(new webpack.EnvironmentPlugin(localEnv))

    config.plugins = [
      ...config.plugins,

      // new Dotenv({
      //   path: path.join(__dirname, '.env'),
      //   systemvars: true,
      // }),
    ]

    return config
  },
  // pwa: {
  //   dest: 'public',
  //   disable: process.env.NODE_ENV === 'production' ? false : true,
  // },
  target: 'serverless',
}

module.exports = nextConfig
