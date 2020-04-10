const nextConfig = {
  experimental: {
    modern: true,
    polyfillsOptimization: true,
  },
  env: {
    mongo_uri:
      'mongodb+srv://nico:YAsyCpgdoAkOBD02@cluster0-dwm5u.mongodb.net/monjournaldebord?retryWrites=true&w=majority',
    cloudinary_name: 'dl9mctxsb',
    access_token_secret: 'dfdfdf3434344xxcxccx2232',
    refresh_token_secret: 'sfdgfd3454545453435',
  },

  webpack(config, { dev, isServer }) {
    const splitChunks = config.optimization && config.optimization.splitChunks
    if (splitChunks) {
      const cacheGroups = splitChunks.cacheGroups
      const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/
      if (cacheGroups.framework) {
        cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
          test: preactModules,
        })
        cacheGroups.commons.name = 'framework'
      } else {
        cacheGroups.preact = {
          name: 'commons',
          chunks: 'all',
          test: preactModules,
        }
      }
    }

    return config
  },

  target: 'serverless',
}

module.exports = nextConfig
