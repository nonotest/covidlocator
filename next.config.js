// @generated: @expo/next-adapter@2.0.14
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter')
const withImages = require('next-images')
const withFonts = require('next-fonts')

module.exports = withExpo(
  withFonts(
    withImages({
      projectRoot: __dirname,
      workboxOpts: {
        swDest: 'workbox-service-worker.js',

        /* changing any value means you'll have to copy over all the defaults  */
        /* next-offline */
        globPatterns: ['static/**/*'],
        globDirectory: '.',
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'offlineCache',
              expiration: {
                maxEntries: 200
              }
            }
          }
        ]
      },
      webpack: config => {
        config.resolve.alias = {
          ...(config.resolve.alias || {}),
          'react-native-maps$': 'react-native-web-maps'
        }
        return config
      }
    })
  )
)
