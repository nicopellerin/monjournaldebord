const { parsed: localEnv } = require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const withOffline = require('next-offline')

const nextConfig = {
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
  target: 'serverless',
}

module.exports = withOffline(nextConfig)
