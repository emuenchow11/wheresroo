const withCSS = require('@zeit/next-css')
const withTM = require('next-transpile-modules');

module.exports =
  withCSS(withTM({
    exportPathMap: function () {
      return {
        '/': { page: '/' }
      }
    },
    transpileModules: ['react-s3'],
  }))



