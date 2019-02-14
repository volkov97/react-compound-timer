const path = require('path');

module.exports = {
  entry: './src/components/Timer/Timer.jsx',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js(x)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-react-jsx',
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  externals: {
    react: 'commonjs react',
  },
};
