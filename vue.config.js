const path = require('path')

const resolve = dir => path.join(__dirname, dir)

const publicPath = process.env.NODE_ENV === 'production' ? '/' : '/'

module.exports = {
    lintOnSave: false,
    publicPath: publicPath,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components'))
    },
    productionSourceMap: false,
}
