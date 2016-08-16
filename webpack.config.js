var webpack = require('webpack');
var path = require('path');
var mod = process.env.NODE_ENV || 'development';
console.log(mod);

// path
var ROOT_PATH = path.resolve(__dirname);
var DEV_PATH = path.resolve(ROOT_PATH, 'dev');
var BUILD_PATH = path.resolve(ROOT_PATH, 'static');
var APP_PATH = path.resolve(DEV_PATH, 'app');
var CSS_PATH = path.resolve(DEV_PATH, 'css');
var TEMP_PATH = path.join('./dev/templates');

var isDebug = (process.env.NODE_ENV === 'development');
console.log('isDebug: ', isDebug);

// publicpath
var publicPath = isDebug ? 'http://127.0.0.1:3000/static/' : '/static/';

// entry
var entry = {
  index: path.resolve(APP_PATH, 'index.js'),
  vendors: [
    'vue', 'vue-router', 'vue-resource',
    path.resolve(CSS_PATH, 'normalize.css')
  ]
};

// templates
var templates = [{
  title: 'music list',
  chunks: ['vendors', 'index'],
  template: path.join(TEMP_PATH, 'index.html'),
  filename: path.resolve(BUILD_PATH, 'index.html')
}];

// resource alias
var alias = {
  'less': path.resolve(DEV_PATH, 'less'),
  'api': path.resolve(DEV_PATH, 'app', 'api')
};

// plugins
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackSortChunksPlugin = require('html-webpack-sort-chunks-plugin');

var cssFile = isDebug ? 'css/[name].css' : 'css/[name].css?[contenthash:8]';

var plugins = [
  new webpack.DefinePlugin({
    __ENV__: `"${mod.toString()}"`
  }),
  new CommonsChunkPlugin({
    name: 'vendors',
    filename: isDebug ? 'js/vendors.js' : 'js/vendors.js?[chunkhash:8]'
  }),
  new WebpackMd5Hash(),
  new ExtractTextPlugin(cssFile),
  new HtmlWebpackSortChunksPlugin()
];

if (!isDebug) {
  var uglifyJS = new UglifyJsPlugin({
    compress: {
      warnings: false
    },
    except: ['$super', '$', 'exports', 'require']
  });
  plugins.push(uglifyJS);
};

templates.forEach(html => {
  var { template, filename, chunks } = html;
  var params = {
    chunks,
    template: `!raw!./${template}`,
    filename,
    inject: true,
    minify: {
      removeComments: true
    }
  };
  plugins.push(new HtmlWebpackPlugin(params));
});

// global variables
var externals = {

};

// output
module.exports = {
  entry,

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    color: true,
    port: 3000,
    host: '127.0.0.1',  // 10.6.131.79
    contentBase: './static/'
  },

  output: {
    path: BUILD_PATH,
    filename: isDebug ? 'js/[name].js' : 'js/[name].js?[chunkhash:8]',
    publicPath,
    chunkFilename: isDebug ? 'js/[name].chunk.js' : 'js/[name].chunk.js?[chunkhash:8]'
  },

  resolve: {
    root: [process.cwd() + '/dev', process.cwd() + '/node_modules'], // 绝对路径
    fallback: [path.join(__dirname, './node_modules')],
    extensions: ['', '.coffee', '.js', '.jsx', '.json', '.vue'],
    alias
  },

  externals,

  plugins,

  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        // loader: ExtractTextPlugin.extract('vue-style-loader', 'style-loader!css-loader!less-loader')
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
      },
      {
        test: /\.css$/,
        // loader: ExtractTextPlugin.extract('vue-style-loader', 'style-loader!css-loader')
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      },
      {
        test: /\.(html|xml)$/,
        loader: 'file?name=templates/[1]/[2]&regExp=([^/]+)[/\\\\]templates[/\\\\](.+)$'
      },
      {
        test: /\.(jpeg|jpg|png|gif)$/,
        loader: 'url?limit=8192&name=images/[name].[ext]'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff2&name=fonts/[name].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]'
      }
    ],
    postcss: function () {
      return {
        defaults: [require('autoprefixer'), require('precess')]
      }
    }
  }
}
