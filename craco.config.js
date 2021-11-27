const path = require('path');
const srcDir = path.resolve(__dirname, 'src');

module.exports = {
  babel: {
    presets: ['@emotion/babel-preset-css-prop']
  },
  webpack: {
    alias: {
      '@': srcDir
    }
  }
};
