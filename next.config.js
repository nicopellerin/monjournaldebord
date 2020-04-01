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
      'mongodb+srv://nico:r0XZQSvk8MUwcGcK@cluster0-dwm5u.mongodb.net/monjournaldebord?retryWrites=true&w=majority',
    cloudinary_name: 'dl9mctxsb',
    access_token_secret: 'sdfgjfgjkdfkjg343434',
    refresh_token_secret: '4sdfsdf45454sfsdfsd',
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
