module.exports = {
    apps: [
        {
            namespace: 'guno-hub',
            name: "guno-hub-product-sync-queue",
            script: "./queues/guno-hub/product-sync-queue.js", // Tệp để xử lý job
            instances: 1,         // Số lượng worker, PM2 sẽ tạo các process độc lập
            autorestart: true,  // Tự động restart khi có lỗi
            restart_delay: 5000, // Thời gian nghỉ giữa các lần restart (ms)
        },
        {
            namespace: 'guno-hub',
            name: "guno-hub-warehouse-inventory-transaction-queue",
            script: "./queues/guno-hub/warehouse/inventory-transaction-queue.js", // Tệp để xử lý job
            instances: 1,         // Số lượng worker, PM2 sẽ tạo các process độc lập
            autorestart: true,  // Tự động restart khi có lỗi
            restart_delay: 5000, // Thời gian nghỉ giữa các lần restart (ms)
        },
        {
            namespace: 'guno-hub',
            name: "guno-hub-warehouse-inventory-order-transaction-queue", // cập nhật guno warehouse inventory
            script: "./queues/guno-hub/warehouse/inventory-order-transaction-queue.js", // Tệp để xử lý job
            instances: 1,         // Số lượng worker, PM2 sẽ tạo các process độc lập
            autorestart: true,  // Tự động restart khi có lỗi
            restart_delay: 5000, // Thời gian nghỉ giữa các lần restart (ms)
        },
        {
            namespace: 'guno-hub',
            name: "guno-hub-warehouse-inventory-stocktaking-queue", // cập nhật guno warehouse inventory
            script: "./queues/guno-hub/warehouse/inventory-stocktaking.queue.js", // Tệp để xử lý job
            instances: 1,         // Số lượng worker, PM2 sẽ tạo các process độc lập
            autorestart: true,  // Tự động restart khi có lỗi
            restart_delay: 5000, // Thời gian nghỉ giữa các lần restart (ms)
        },
        {
            namespace: 'guno-hub',
            name: "guno-hub-finance-dept-queue", // cập nhật guno warehouse inventory
            script: "./queues/guno-hub/finance/dept-transaction.queue.js", // Tệp để xử lý job
            instances: 1,         // Số lượng worker, PM2 sẽ tạo các process độc lập
            autorestart: true,  // Tự động restart khi có lỗi
            restart_delay: 5000, // Thời gian nghỉ giữa các lần restart (ms)
        },
        {
            namespace: 'guno-hub',
            name: "guno-hub-stats-product-sku-queue",
            script: "./queues/guno-hub/stats/product-sku.queue.js", // Tệp để xử lý job
            instances: 1,         // Số lượng worker, PM2 sẽ tạo các process độc lập
            autorestart: true,  // Tự động restart khi có lỗi
            restart_delay: 5000, // Thời gian nghỉ giữa các lần restart (ms)
        },
        {
            namespace: 'guno-hub',
            name: "guno-hub-product-update-cost-price-queue",
            script: "./queues/guno-hub/product/update-cost-price.queue.js", // Tệp để xử lý job
            instances: 1,         // Số lượng worker, PM2 sẽ tạo các process độc lập
            autorestart: true,  // Tự động restart khi có lỗi
            restart_delay: 5000, // Thời gian nghỉ giữa các lần restart (ms)
        },
        // {
        //     namespace: 'pos-pancake',
        //     name: "pos-pancake-fm-order-sync.to.open.nhanh.vn",
        //     script: "./queues/pos-pancake-fm/order/sync.to.open.nhanh.vn.queue.js", // Tệp để xử lý job
        //     instances: 1,         // Số lượng worker, PM2 sẽ tạo các process độc lập
        //     autorestart: true,  // Tự động restart khi có lỗi
        //     restart_delay: 5000, // Thời gian nghỉ giữa các lần restart (ms)
        // },
        {
            namespace: 'pos-pancake',
            name: "pos-pancake-fm-product-variation-update-quantity",
            script: "./queues/pos-pancake-fm/product/variation.update.quantity.queue.js", // Tệp để xử lý job
            instances: 1,         // Số lượng worker, PM2 sẽ tạo các process độc lập
            autorestart: true,  // Tự động restart khi có lỗi
            restart_delay: 5000, // Thời gian nghỉ giữa các lần restart (ms)
        },
        {
            namespace: 'nhanh-vn',
            name: "nhanh-vn-order-update-product",
            script: "./queues/nhanh-vn/order/update.product.queue.js", // Tệp để xử lý job
            instances: 1,         // Số lượng worker, PM2 sẽ tạo các process độc lập
            autorestart: true,  // Tự động restart khi có lỗi
            restart_delay: 5000, // Thời gian nghỉ giữa các lần restart (ms)
        }
    ]
};
