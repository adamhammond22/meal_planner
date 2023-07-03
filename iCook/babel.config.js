/* Babel is a tool to transpile JS code. We are ignoring it for now */
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo']
  }
}
