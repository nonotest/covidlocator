// @generated: @expo/next-adapter@2.0.14
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter')
const withImages = require('next-images')
const withFonts = require('next-fonts')
const withTM = require('next-transpile-modules')

module.exports = withExpo(
  withFonts(
    withImages({
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

/*

module.exports = withExpo(
  withFonts(
    withImages(
       {
        projectRoot: __dirname,
        transpileModules: ['react-native-paper', 'react-native-vector-icons'],

        webpack: (config, { defaultLoaders }) => {
          config.resolve.alias = {
            ...(config.resolve.alias || {}),
            'react-native-maps$': 'react-native-web-maps'
          }
          config.resolve.extensions.push(
            '.web.ts',
            '.web.tsx',
            '.ts',
            '.tsx',
            '.web.js',
            '.web.jsx',
            '.js',
            '.jsx'
          )
          config.resolve.modules = [
            ...config.resolve.modules,
            path.resolve(__dirname, 'node_modules')
          ]
          config.resolve.symlinks = false
          config.module.rules.push(
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              use: ['url-loader?limit=10000', 'img-loader']
            },
            {
              test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
              exclude: /node_modules/,
              loader: 'file-loader'
            },
            {
              test: /\.(woff|woff2)$/,
              exclude: /node_modules/,
              loader: 'url-loader?prefix=font/&limit=5000'
            },
            {
              test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
              exclude: /node_modules/,
              loader:
                'url-loader?limit=10000&mimetype=application/octet-stream',
              include: path.resolve(
                __dirname,
                'node_modules/react-native-vector-icons'
              )
            }
          )

          return config
        }
      })
    )
  )
)

*/
