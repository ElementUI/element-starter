var utils = require('./utils')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: true,
    extract: isProduction
  })
}
