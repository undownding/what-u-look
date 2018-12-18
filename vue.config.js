module.exports = {
    devServer:{
        proxy: {
            '/bilibili': {
                target: 'https://m.bilibili.com/',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/bilibili': 'search'
                }
            },
            '/zimuzu': {
                target: 'http://www.zimuzu.tv/',
                changeOrigin: true,
                pathRewrite: {
                    '^/zimuzu' : 'search'
                }
            }
        }
    }
}