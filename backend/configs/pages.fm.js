require('dotenv').load()
module.exports = {
    host: 'pages.fm',
    port: 443,
    ssl: true,
    prefixPath: 'api/public_api/v1',
    paths: {
        pages: {
            post: {
                list: 'pages/%s/posts'
            }
        }
    },
    pagesAccessToken: {
        '105728414383721': process.env.PAGES_FM_PAGE_ACCESS_TOKEN_105728414383721 || '',
        '121367394236960': process.env.PAGES_FM_PAGE_ACCESS_TOKEN_121367394236960 || '',
        '416155228242042': process.env.PAGES_FM_PAGE_ACCESS_TOKEN_416155228242042 || '',
        '743467925510574': process.env.PAGES_FM_PAGE_ACCESS_TOKEN_743467925510574 || '',
    }
}
