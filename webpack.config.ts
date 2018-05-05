// tslint:disable:import-name
import { AureliaPlugin, ModuleDependenciesPlugin } from 'aurelia-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { readFileSync } from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));

interface IEnv {
  server?: boolean;
  production?: boolean;
}

const title = pkg.name;
const devBaseUrl: string = '/';
const prodBaseUrl: string = `/${pkg.name}/`;

function createHtmlWebpackPlugin(env: IEnv = {}): HtmlWebpackPlugin {
  const opts: HtmlWebpackPlugin.Options = {
    template: 'demo/index.ejs',
    metadata: {
      title,
      server: env.server,
      baseUrl: env.production ? prodBaseUrl : devBaseUrl
    }
  };
  if (env.production) {
    opts.minify = {
      removeComments: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      minifyCSS: true,
      minifyJS: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      ignoreCustomFragments: [/\${.*?}/g]
    };
  }

  return new HtmlWebpackPlugin(opts);
}

function configure(env: IEnv = {}): webpack.Configuration {
  return {
    mode: env.production ? 'production' : 'development',
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['src', 'demo', 'node_modules'],
      alias: {
        bluebird: path.resolve(__dirname, 'node_modules/bluebird/js/browser/bluebird.core')
      }
    },
    entry: {
      app: ['aurelia-bootstrapper'],
      vendor: ['bluebird']
    },
    output: {
      path: path.resolve(__dirname),
      publicPath: env.production ? prodBaseUrl : devBaseUrl,
      filename: env.production ? '[name].[chunkhash].bundle.js' : '[name].[hash].bundle.js',
      sourceMapFilename: env.production ? '[name].[chunkhash].bundle.map' : '[name].[hash].bundle.map',
      chunkFilename: env.production ? '[name].[chunkhash].chunk.js' : '[name].[hash].chunk.js'
    },
    devtool: env.production ? 'nosources-source-map' : 'cheap-module-eval-source-map',
    performance: { hints: false },
    devServer: {
      historyApiFallback: true,
      lazy: false,
      open: true,
      overlay: {
        warnings: true,
        errors: true
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{ loader: 'css-loader' }]
          }),
          issuer: [{ not: [{ test: /\.html$/i }] }]
        },
        {
          test: /\.css$/,
          use: [{ loader: 'css-loader' }],
          issuer: [{ test: /\.html$/i }]
        },
        {
          test: /\.html$/,
          use: [{ loader: 'html-loader' }]
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          issuer: /\.[tj]s$/i
        },
        {
          test: /\.scss$/,
          use: ['css-loader', 'sass-loader'],
          issuer: /\.html?$/i
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            configFile: path.resolve(__dirname, 'configs/tsconfig-demo.json')
          }
        },
        {
          test: /[\/\\]node_modules[\/\\]bluebird[\/\\].+\.js$/,
          use: [{ loader: 'expose-loader?Promise' }]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[hash].[ext]'
            }
          }
        }
      ]
    },
    plugins: [
      new AureliaPlugin(),
      new webpack.ProvidePlugin({ Promise: 'bluebird' }),
      new ModuleDependenciesPlugin({}),
      createHtmlWebpackPlugin(env)
    ]
  };
}

export default configure;
