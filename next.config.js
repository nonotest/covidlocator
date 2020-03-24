// @generated: @expo/next-adapter@2.0.14
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter')
const withImages = require('next-images')
const withFonts = require('next-fonts')
const withTM = require('next-transpile-modules')

module.exports = withExpo(
  withFonts(
    withImages(
      withTM({
        transpileModules: ['reanimated-bottom-sheet'],
        projectRoot: __dirname,

        webpack: (config, { defaultLoaders }) => {
          config.resolve.alias = {
            ...(config.resolve.alias || {}),
            'react-native-maps$': 'react-native-web-maps'
          }

          return config
        }
      })
    )
  )
)
