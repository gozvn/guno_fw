require('dotenv').load()
module.exports = {
    host: 'pos.pages.fm',
    port: 443,
    ssl: true,
    prefixPath: 'api/v1',
    auth: {
        in: 'query',
        key: 'api_key',
        value: process.env.PANCAKE_API_KEY || 'xxx',
        webHookKeys: [{
            key: 'web-hook-auth-token',
            value: 'mt9HhPttxQoXi5fHVV5699a56PPXB4wEex2xqbrGsjUGtWZVxgYwzgVLJPTL82jXL7WbsH54mo2GV577j4s7cFMGsoxFwYBW1tff'
        }]
    },
    shops: process.env.PANCAKE_SHOP_IDS.split(',') || [],
    paths: {
        shop: {
            info: 'shops/%s',
            order: 'shops/%s/orders?page_size=%s&page_number=%s&option_sort=%s',
            orderDetails: 'shops/%s/orders/%s',
            orderUpdate: 'shops/%s/orders/%s',
            orderTag: 'shops/%s/orders/tags',
            customer: 'shops/%s/customers?page_size=%s&page_number=%s',
            product: 'shops/%s/products?page_size=%s&page_number=%s',
            productVariation: 'shops/%s/products/variations?page_size=%s&page_number=%s',
            productVariationUpdateQuantity: 'shops/%s/variations/%s/update_quantity',
            user: 'shops/%s/users',
            wareHouse: 'shops/%s/warehouses',
            inventory: {
                product: {
                    import: {
                        create: 'shops/%s/purchases'
                    },
                    stockTaking: {
                        create: 'shops/%s/stocktakings',
                        cancel: 'shops/%s/stocktakings/%s'
                    }
                }
            },
            supplier: {
                search: 'shops/%s/supplier'
            }
        }
    },
    warehouses: {
        2443210: [
            { id: '28fc1a64-eba3-47d3-bf39-d1b2c7c88f09', name: 'TT.K2', custom_id: 'TTK2', default: true }
        ]
    },
    partners: [
        { id: 0, name: 'Snappy', sortName: 'Snappy' },
        { id: 1, name: 'Giao hàng tiết kiếm', sortName: 'GHTK', color: '#008000' },
        { id: 2, name: 'EMS', sortName: 'EMS' },
        { id: 3, name: 'Viettel Post', sortName: 'Viettel Post', color: '#017d7d' },
        { id: 4, name: '247', sortName: '247' },
        { id: 5, name: 'Giao hàng nhanh', sortName: 'GHN', color: '#f66600' },
        { id: 7, name: 'VNP', sortName: 'VNP' },
        { id: 9, name: 'DHL', sortName: 'DHL' },
        { id: 10, name: 'J&T Philippines', sortName: 'J&T Philippines' },
        { id: 11, name: 'Ahamove', sortName: 'Aha', color: '#f48200' },
        { id: 12, name: 'LBC', sortName: 'LBC' },
        { id: 13, name: 'Lazada Express', sortName: 'Lazada Express' },
        { id: 15, name: 'J&T', sortName: 'J&T', color: '#ff0000' },
        { id: 16, name: 'Best Inc', sortName: 'Best Inc' },
        { id: 17, name: 'VN Post v2', sortName: 'VN Post v2' },
        { id: 19, name: 'Ninja Van', sortName: 'Ninja Van', color: '#c2002f' },
        { id: 32, name: 'SuperShip', sortName: 'SuperShip' },
        { id: 33, name: 'ZTO Express', sortName: 'ZTO Express' },
        { id: 36, name: 'Nhất Tín Express', sortName: 'NTX' },
        { id: 37, name: 'Grab Express', sortName: 'Grab Express' },
        { id: 38, name: 'Van Phuc', sortName: 'Van Phuc' },
        { id: 39, name: 'Hola Ship', sortName: 'Hola Ship' },
        { id: 40, name: 'LWE Express', sortName: 'LWE Express' },
        { id: 41, name: 'Flash Express Phi', sortName: 'Flash Express Phi' },
        { id: 42, name: 'Shopee Xp', sortName: 'Shopee Xp', color: '#dc143c' }
    ],
    statuses: [
        { id: -2, name: 'Cần xử lý', actionName: 'Cần xử lý', shopName: 'Cần xử lý', color: '', icon: '' },
        { id: 0, name: 'Mới', actionName: 'Mới', shopName: 'Mới', color: '#00a2ae', icon: '' },
        { id: 1, name: 'Đã xác nhận', actionName: 'Xác nhận đơn hàng', shopName: 'Đã xác nhận', color: '#1890ff', icon: '<i class="mr-2 icon icon-shield-check"></i>' },
        { id: 2, name: 'Đã gửi hàng', actionName: 'Gửi hàng đi', shopName: 'Đã gửi', color: '#f79009', icon: '<i class="mr-2 icon icon-car"></i>' },
        { id: 3, name: 'Đã nhận', actionName: 'Khách đã nhận được', shopName: 'Đã nhận', color: '#3dbd7d', icon: '<i class="mr-2 icon icon-heart6"></i>' },
        { id: 4, name: 'Đang hoàn', actionName: 'Khách trả lại', shopName: 'Đang trả hàng', color: '#e74b3c', icon: '<i class="mr-2 mi-sentiment-neutral"></i>' },
        { id: 5, name: 'Đã hoàn', actionName: 'Đã hoàn toàn bộ', shopName: 'Trả hàng thành công', color: '#a31837', icon: '<i class="mr-2 mi-sentiment-dissatisfied"></i>' },
        { id: 6, name: 'Đã hủy', actionName: 'Hủy đơn', shopName: 'Đã hủy', color: '#d73435', icon: '<i class="mr-2 icon icon-cancel-circle2"></i>' },
        { id: 7, name: 'Xóa gần đây', actionName: 'Xóa đơn', shopName: 'Đã xóa', color: '#962223', icon: '<i class="mr-2 icon icon-trash-alt"></i>' },
        { id: 8, name: 'Đang đóng hàng', actionName: 'Đang đóng hàng', shopName: 'Đang đóng hàng', color: '#7265e6', icon: '<i class="mr-2 icon icon-gift"></i>' },
        { id: 9, name: 'Chờ chuyển hàng', actionName: 'Chờ chuyển hàng', shopName: 'Chờ chuyển hàng', color: '#e34999', icon: '<i class="mr-2 icon icon-check2"></i>' },
        { id: 11, name: 'Chờ hàng', actionName: 'Chờ hàng', shopName: 'Chờ hàng', color: '#b49f09', icon: '<i class="mr-2 icon icon-alarm"></i>' },
        { id: 12, name: 'Chờ in', actionName: 'Chờ in', shopName: 'Chờ in', color: '#1775d1', icon: '<i class="mr-2 icon icon-printer2"></i>' },
        { id: 13, name: 'Đã in', actionName: 'Đã in', shopName: 'Đã in', color: '#1234ef', icon: '<i class="mr-2 icon icon-printer2"></i>' },
        { id: 15, name: 'Hoàn 1 phần', actionName: 'Hoàn 1 phần', shopName: 'Hoàn 1 phần', color: '#005667', icon: '<i class="mr-2 mi-sentiment-very-dissatisfied"></i>' },
        { id: 16, name: 'Đã thu tiền', actionName: 'Đã thu tiền', shopName: 'Đã thu tiền', color: '' },
        { id: 18, name: 'Đang đổi', actionName: 'Đang đổi', shopName: 'Đang đổi', color: '' },
        { id: 19, name: 'Đã đổi', actionName: 'Đã đổi', shopName: 'Đã đổi', color: '' }
    ],
    tags:[
        {id: 71, name: "Huy (Kho)"},
        {id: 76, name: "Cô Ngọc (Kho)"},
        {id: 77, name: "Chung (Kho)"},
        {id: 29, name: "Không liên lạc được"},
        {id: 28, name: "Không nghe máy"},
        {id: 27, name: "Đối soát phí"},
        {id: 26, name: "Đối soát COD"},
        {id: 25, name: "Hoàn một phần"},
        {id: 24, name: "Cần xác nhận"},
        {id: 23, name: "Liên hệ ĐVVC"},
        {id: 22, name: "Thông báo cho người nhận"},
        {id: 21, name: "Chưa hỗ trợ VC"},
        {id: 20, name: "Đang giao hàng"},
        {id: 19, name: "Chờ chuyển hoàn"},
        {id: 18, name: "Chờ chuyển kho"},
        {id: 17, name: "Đã lấy hàng"},
        {id: 16, name: "Quá ngày giao h"},
        {id: 15, name: "Delay giao hàng"},
        {id: 14, name: "Không lấy được hàng"},
        {id: 13, name: "Delay lấy hàng"},
        {id: 8, name: "Hẹn gọi"},
        {id: 7, name: "Đổi hàng"},
        {id: 6, name: "Đối soát lệch"},
        {id: 5, name: "Đã đối soát"},
        {id: 4, name: "Chưa đối soát"},
        {id: 3, name: "Nhập hàng"},
        {id: 2, name: "Chờ cọc"},
        {id: 1, name: "Giao không thành"},
    ],
    tagIgnoreSyncToNhanh: {
        id: 88, name: "Affiliate (Not Sync)"
    },
    order: {
        ruleUpdate: [
            { status: 0, allow: { statuses: [0, 1, 2, 6, 7, 8, 9, 11, 12, 13], fields: ['shipping_fee', 'customer_partners', 'total_price', 'transfer_money', 'cod', 'note_print', 'note', 'status_shop'] }},
            { status: 1, allow: { statuses: [1, 2, 3, 6, 8, 9, 11, 12, 13], fields: ['shipping_fee', 'customer_partners', 'total_price', 'transfer_money', 'cod', 'note_print', 'note', 'status_shop'] }},
            { status: 2, allow: { statuses: [2, 3, 4, 5, 6], fields: ['shipping_fee', 'customer_partners', 'total_price', 'transfer_money', 'cod', 'note_print', 'note'] }},
            { status: 3, allow: { statuses: [3, 2, 4, 5, 6], fields: ['shipping_fee', 'customer_partners', 'total_price', 'transfer_money', 'cod', 'note_print', 'note'] }},
            { status: 4, allow: { statuses: [4, 2, 3, 5, 6], fields: ['shipping_fee', 'customer_partners', 'total_price', 'transfer_money', 'cod', 'note_print', 'note'] }},
            { status: 5, allow: { statuses: [5, 6], fields: ['shipping_fee', 'customer_partners', 'total_price', 'transfer_money', 'cod', 'note_print', 'note'] }},
            { status: 6, allow: { statuses: [6, 7], fields: ['shipping_fee', 'customer_partners', 'total_price', 'transfer_money', 'cod', 'note_print', 'note'] }},
            { status: 7, allow: { statuses: [7], fields: ['shipping_fee', 'customer_partners', 'total_price', 'transfer_money', 'cod', 'note_print', 'note'] }},
            { status: 8, allow: { statuses: [8, 1, 2, 3, 6, 9, 11], fields: ['shipping_fee', 'customer_partners', 'total_price', 'transfer_money', 'cod', 'note_print', 'note'] }},
            { status: 9, allow: { statuses: [9, 1, 2, 3, 6, 8], fields: ['shipping_fee', 'customer_partners', 'total_price', 'transfer_money', 'cod', 'note_print', 'note'] }},
            { status: 11, allow: { statuses: [11, 1, 2, 3, 6, 8, 9, 12, 13], fields: ['shipping_fee', 'customer_partners', 'total_price', 'transfer_money', 'cod', 'note_print', 'note'] }},
            { status: 12, allow: { statuses: [12, 1, 2, 6, 7, 8, 9, 11, 13], fields: ['shipping_fee', 'customer_partners', 'total_price', 'transfer_money', 'cod', 'note_print', 'note'] }},
            { status: 13, allow: { statuses: [13, 1, 2, 6, 7, 8, 9, 11], fields: ['shipping_fee', 'customer_partners', 'total_price', 'transfer_money', 'cod', 'note_print', 'note'] }},
            { status: 15, allow: { statuses: [15, 3, 5, 6], fields: ['shipping_fee', 'customer_partners', 'total_price', 'transfer_money', 'cod', 'note_print', 'note'] }},
        ]
    },
    shopTags: {
        2443210: [
            { id: 83, name: 'Đã tạo trên Nhanh' }
        ]
    }
}
