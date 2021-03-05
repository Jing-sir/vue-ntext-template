// const pxToRem = require('postcss-pxtorem');
const CompressionPlugin = require('compression-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const {
    npm_package_name: name,
} = process.env;

module.exports = { // https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE
    publicPath: '/',
    outputDir: `${name}`,
    productionSourceMap: !isProduction,
    css: {
        sourceMap: !isProduction,
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
            },
            /*postcss: {
              // 这里的选项会传递给 postcss-loader
               plugins: [pxToRem({
                rootValue: 75,
                propList: ['*'],
                // 注意：如果有使用第三方UI如VUX，则需要配置下忽略选择器不转换。
                // 规则是class中包含的字符串，如vux中所有的class前缀都是weui-。也可以是正则。
                selectorBlackList: ['el-'],
              })],
            }, */
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                additionalData: '@import "@/assets/styleSheet/variables.scss";',
            },
        },
    },
    // eslint-disable-next-line no-unused-vars
    configureWebpack(config) {
        if (process.env.NODE_ENV === 'production') { // GZIP压缩
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.(js|css)(\?.*)?$/i, // 需要压缩的文件正则
                        threshold: 10240, // 文件大小大于这个值时启用压缩
                        deleteOriginalAssets: false, // 压缩后保留原文件
                    }),
                    new MomentLocalesPlugin({ // 剥离moment语言包
                        localesToKeep: ['es-us', 'zh-cn'],
                    }),
                ]
            }
        }
        return undefined;
    },
    devServer: {
        port: '8084',
        proxy: {
            '/api': {
                // target: 'http://web-dev.panda-inner.co/', // 本地
                target: 'http://web.panda-inner.co', // 测试
                // target: 'http://stg.panda.co', // 预发
                // target: 'https://www.panda.co', // 生产
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    '^/': '', // rewrite...,
                },
            },
        },
    },
};
