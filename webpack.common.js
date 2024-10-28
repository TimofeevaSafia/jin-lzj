const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'docs'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        test: /\.png/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.svg/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf)$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),

    // Index
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),

      // Страницы разделов
      new HtmlWebpackPlugin({
        template: './src/architecture.html',
        filename: './architecture.html'
      }),

      new HtmlWebpackPlugin({
        template: './src/ceremonies.html',
        filename: './ceremonies.html'
      }),

      new HtmlWebpackPlugin({
        template: './src/homemade.html',
        filename: './homemade.html'
      }),

      new HtmlWebpackPlugin({
        template: './src/teamap.html',
        filename: './teamap.html'
      }),

      // Страны в Архитектуре
      new HtmlWebpackPlugin({
        template: './src/architecture/countries.html',
        filename: './architecture/countries.html'
      }),

      // Особенности архитектуры в разных странах
      new HtmlWebpackPlugin({
        template: './src/architecture/features.html',
        filename: './architecture/features.html'
      }),

      // Подразделы в церемониях

      new HtmlWebpackPlugin({
        template: './src/ceremonies/context.html',
        filename: './ceremonies/context.html'
      }),

      new HtmlWebpackPlugin({
        template: './src/ceremonies/etiquette.html',
        filename: './ceremonies/etiquette.html'
      }),

      new HtmlWebpackPlugin({
        template: './src/ceremonies/tableware.html',
        filename: './ceremonies/tableware.html'
      }),

      // Рецепты
      new HtmlWebpackPlugin({
        template: './src/homemade/recepies.html',
        filename: './homemade/recepies.html'
      }),

      //Чайная карта
      new HtmlWebpackPlugin({
        template: './src/teamap/tags.html',
        filename: './teamap/tags.html'
      }),

    // Article
    // new HtmlWebpackPlugin({
    //   template: './src/articles/superorganisms/S_Popup.html',
    //   filename: './superorganisms/S_Popup.html'
    // }),

    // Partials
    // new HtmlWebpackPartialsPlugin([
    //   {
    //     path: path.join(__dirname, './src/partials/analytics.html'),
    //     location: 'analytics',
    //     template_filename: '*',
    //     priority: 'replace'
    //   }
    // ])
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
}
