const { parsed: localEnv } = require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
// const withPWA = require('next-pwa')

const nextConfig = {
  experimental: {
    modern: true,
    polyfillsOptimization: true,
  },

  webpack: config => {
    config.plugins = config.plugins || []
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
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
