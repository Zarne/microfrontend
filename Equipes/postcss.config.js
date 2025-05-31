

const config = {
  plugins: [
    require('autoprefixer'),
    require("postcss-prefixwrap")(".operator"),
    "postcss-preset-env"
  ]
}

module.exports = config