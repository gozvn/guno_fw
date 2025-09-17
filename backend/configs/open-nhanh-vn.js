require('dotenv').load()
module.exports = {
    host: 'open.nhanh.vn',
    port: 443,
    ssl: true,
    version: process.env.OPEN_NHANH_VERSION || '2.0',
    appId: process.env.OPEN_NHANH_APP_ID || '',
    secretKey: process.env.OPEN_NHANH_APP_SECRET_KEY || '',
    businessId: process.env.OPEN_NHANH_BUSINESS_ID || '',
    depotId: process.env.OPEN_NHANH_DEPOT_ID || '',
    prefixPath: 'api',
    paths: {
        oauth: {
            accessToken: 'oauth/access_token'
        },
        product: {
            add: 'product/add',
            search: 'product/search',
            detail: 'product/detail',
            category: 'product/category',
            internalCategory: 'product/internalcategory'
        },
        order: {
            add: 'order/add',
            update: 'order/update',
            search: 'order/index'
        },
        store: {
            depot: 'store/depot'
        },
        shipping: {
            carrier: 'shipping/carrier',
            fee: 'shipping/fee',
            location: 'shipping/location'
        },
        bill: {
            search: 'bill/search', // Dùng để lấy danh sách phiếu xuất nhập kho (hóa đơn nhập nhà cung cấp, bán lẻ, bán buôn, chuyển kho, kiểm kho).
            imexs: 'bill/imexs', // Tính năng này dùng để lấy danh sách sản phẩm xuất nhập kho của doanh nghiệp.
        }
    },
    business: {
        account: {
            username: process.env.OPEN_NHANH_BUSINESS_USERNAME || '',
            password: process.env.OPEN_NHANH_BUSINESS_PASSWORD || '',
        }
    }
}
