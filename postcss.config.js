module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      // cssnano 压缩css代码
      preset: 'default',
    }),
  ],
}
