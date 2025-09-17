export const STATUS_CONFIG  = {
    orders: [
        {id: 1, value: 'UNPAID'},
        {id: 2, value: 'ON_HOLD'},
        {id: 3, value: 'AWAITING_SHIPMENT'},
        {id: 4, value: 'PARTIALLY_SHIPPING'},
        {id: 5, value: 'AWAITING_COLLECTION'},
        {id: 6, value: 'IN_TRANSIT'},
        {id: 7, value: 'DELIVERED'},
        {id: 8, value: 'COMPLETED'},
        {id: 9, value: 'CANCELLED'}
    ],
    returnRefund: {
        types: {
            refundOnly: 'REFUND'
        },
        statuses: {
            requestPending: "RETURN_OR_REFUND_REQUEST_PENDING",
            rejectPackage: "REJECT_RECEIVE_PACKAGE",
            buyerShipped: "BUYER_SHIPPED_ITEM",
            waitingBuyerShip: "AWAITING_BUYER_SHIP",
            rejectRequest: "REFUND_OR_RETURN_REQUEST_REJECT",
            success: "RETURN_OR_REFUND_REQUEST_SUCCESS",
            cancel: "RETURN_OR_REFUND_REQUEST_CANCEL",
            complete: "RETURN_OR_REFUND_REQUEST_COMPLETE",
            waitingBuyerResponse: "AWAITING_BUYER_RESPONSE"
        },
        arrStatuses: [
            'RETURN_OR_REFUND_REQUEST_PENDING',
            'REFUND_OR_RETURN_REQUEST_REJECT',
            'AWAITING_BUYER_SHIP',
            'BUYER_SHIPPED_ITEM',
            'REJECT_RECEIVE_PACKAGE',
            'RETURN_OR_REFUND_REQUEST_SUCCESS',
            'RETURN_OR_REFUND_REQUEST_CANCEL',
            'RETURN_OR_REFUND_REQUEST_COMPLETE',
            'AWAITING_BUYER_RESPONSE'
        ]
    },
    pancake: {
        statuses: [
            // { id: -2, name: 'Cần xử lý', actionName: 'Cần xử lý', shopName: 'Cần xử lý', color: '', icon: '' },
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
            { id: 19, name: 'Đã đổi', actionName: 'Đã đổi', shopName: 'Đã đổi', color: '' },
            { id: 20, name: 'Đã đặt hàng', actionName: 'Đã đặt hàng', shopName: 'Đã đặt hàng', color: '' }
        ],
        statusesSorted: [
            { id: 0, name: 'Mới', actionName: 'Mới', shopName: 'Mới', color: '#00a2ae', icon: '' },
            { id: 11, name: 'Chờ hàng', actionName: 'Chờ hàng', shopName: 'Chờ hàng', color: '#b49f09', icon: '<i class="mr-2 icon icon-alarm"></i>' },
            { id: 20, name: 'Đã đặt hàng', actionName: 'Đã đặt hàng', shopName: 'Đã đặt hàng', color: '' },
            { id: 1, name: 'Đã xác nhận', actionName: 'Xác nhận đơn hàng', shopName: 'Đã xác nhận', color: '#1890ff', icon: '<i class="mr-2 icon icon-shield-check"></i>' },
            { id: 12, name: 'Chờ in', actionName: 'Chờ in', shopName: 'Chờ in', color: '#1775d1', icon: '<i class="mr-2 icon icon-printer2"></i>' },
            { id: 13, name: 'Đã in', actionName: 'Đã in', shopName: 'Đã in', color: '#1234ef', icon: '<i class="mr-2 icon icon-printer2"></i>' },
            { id: 8, name: 'Đang đóng hàng', actionName: 'Đang đóng hàng', shopName: 'Đang đóng hàng', color: '#7265e6', icon: '<i class="mr-2 icon icon-gift"></i>' },
            { id: 9, name: 'Chờ chuyển hàng', actionName: 'Chờ chuyển hàng', shopName: 'Chờ chuyển hàng', color: '#e34999', icon: '<i class="mr-2 icon icon-check2"></i>' },
            { id: 2, name: 'Đã gửi hàng', actionName: 'Gửi hàng đi', shopName: 'Đã gửi', color: '#f79009', icon: '<i class="mr-2 icon icon-car"></i>' },
            { id: 3, name: 'Đã nhận', actionName: 'Khách đã nhận được', shopName: 'Đã nhận', color: '#3dbd7d', icon: '<i class="mr-2 icon icon-heart6"></i>' },
            { id: 16, name: 'Đã thu tiền', actionName: 'Đã thu tiền', shopName: 'Đã thu tiền', color: '' },
            { id: 4, name: 'Đang hoàn', actionName: 'Khách trả lại', shopName: 'Đang trả hàng', color: '#e74b3c', icon: '<i class="mr-2 mi-sentiment-neutral"></i>' },
            { id: 18, name: 'Đang đổi', actionName: 'Đang đổi', shopName: 'Đang đổi', color: '' },
            { id: 15, name: 'Hoàn 1 phần', actionName: 'Hoàn 1 phần', shopName: 'Hoàn 1 phần', color: '#005667', icon: '<i class="mr-2 mi-sentiment-very-dissatisfied"></i>' },
            { id: 5, name: 'Đã hoàn', actionName: 'Đã hoàn toàn bộ', shopName: 'Trả hàng thành công', color: '#a31837', icon: '<i class="mr-2 mi-sentiment-dissatisfied"></i>' },
            { id: 19, name: 'Đã đổi', actionName: 'Đã đổi', shopName: 'Đã đổi', color: '' },
            { id: 6, name: 'Đã hủy', actionName: 'Hủy đơn', shopName: 'Đã hủy', color: '#d73435', icon: '<i class="mr-2 icon icon-cancel-circle2"></i>' },
            { id: 7, name: 'Xóa gần đây', actionName: 'Xóa đơn', shopName: 'Đã xóa', color: '#962223', icon: '<i class="mr-2 icon icon-trash-alt"></i>' },
        ]
    }
}
