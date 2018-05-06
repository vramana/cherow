// tslint:disable:import-name
// tslint:disable:no-require-imports
import { AureliaPlugin, ModuleDependenciesPlugin } from 'aurelia-webpack-plugin';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
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

const styleLoader = { loader: 'style-loader' };
const cssLoader = { loader: 'css-loader' };
const postcssLoader = {
  loader: 'postcss-loader',
  options: { plugins: () => [require('autoprefixer')({ browsers: ['last 2 versions'] })] }
};
const htmlLoader = { loader: 'html-loader' };
const sassLoader = { loader: 'sass-loader' };
const jsonLoader = { loader: 'json-loader' };
const tsLoader = {
  loader: 'ts-loader',
  options: { configFile: path.resolve(__dirname, 'configs/tsconfig-demo.json') }
};
const fileLoader = { loader: 'file-loader', options: { name: '[path][name].[ext]' } };
const exposeLoader = { loader: 'expose-loader?Promise' };

function configure(env: IEnv = {}): webpack.Configuration {
  return {
    mode: env.production ? 'production' : 'development',
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'demo'), 'node_modules'],
      alias: {
        bluebird: path.resolve(__dirname, 'node_modules/bluebird/js/browser/bluebird')
      }
    },
    entry: {
      app: ['aurelia-bootstrapper'],
      vendor: ['bluebird']
    },
    output: {
      path: path.resolve(__dirname, 'demo'),
      publicPath: env.production ? prodBaseUrl : devBaseUrl,
      filename: '[name].bundle.js'
    },
    devtool: env.production ? 'nosources-source-map' : 'cheap-module-eval-source-map',
    performance: { hints: false },
    devServer: {
      historyApiFallback: true,
      lazy: false,
      open: true
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [styleLoader, cssLoader, postcssLoader],
          issuer: [{ not: [{ test: /\.html$/i }] }]
        },
        {
          test: /\.css$/,
          use: [cssLoader, postcssLoader],
          issuer: [{ test: /\.html$/i }]
        },
        {
          test: /\.html$/,
          use: [htmlLoader]
        },
        {
          test: /\.scss$/,
          use: [styleLoader, cssLoader, postcssLoader, sassLoader],
          issuer: /\.[tj]s$/i
        },
        {
          test: /\.scss$/,
          use: [cssLoader, postcssLoader, sassLoader],
          issuer: /\.html?$/i
        },
        {
          test: /\.ts$/,
          use: [tsLoader],
          exclude: /node_modules/
        },
        {
          test: /[\/\\]node_modules[\/\\]bluebird[\/\\].+\.js$/,
          use: [exposeLoader]
        },
        {
          test: /\.(jpe?g|png|gif|svg|tff|eot|otf|woff2?)$/i,
          use: [fileLoader]
        }
      ]
    },
    plugins: [
      createHtmlWebpackPlugin(env),
      new MonacoWebpackPlugin({
        languages: ['typescript'],
        features: ['colorDetector']
      }),
      new webpack.IgnorePlugin(
        /^((fs)|(path)|(os)|(crypto)|(source-map-support))$/,
        /vs(\/|\\)language(\/|\\)typescript(\/|\\)lib/
      ),
      new AureliaPlugin(),
      new webpack.ProvidePlugin({ Promise: 'bluebird' })
    ]
  };
}

export default configure;
