import {NavItem} from '../../vertical/sidebar/nav-item/nav-item';
import {environment} from "../../../../../../../environments/environment";

export const navItems: NavItem[] = [
    {
        navCap: 'Home',
    },
    {
        displayName: 'Báo cáo',
        iconName: 'solar:chart-line-duotone',
        route: 'dashboard',
        roles: [environment.roles.admin],
        children: [
            {
                displayName: 'Báo cáo thống kê',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'dashboard',
                roles: []
            }
        ]
    },
    {
        displayName: 'Orders',
        iconName: 'solar:cart-check-linear',
        route: 'order',
        roles: [environment.roles.admin],
        //ddType: 'two-column',
        children: [
            {
                displayName: 'Đơn hàng',
                iconName: 'solar:cart-check-linear',
                route: 'order',
                roles: [environment.roles.admin]
            },
            {
                displayName: 'Trả hàng / Hoàn tiền',
                iconName: 'solar:round-double-alt-arrow-left-outline',
                route: 'order/return-refund',
                roles: [environment.roles.admin]
            }
        ],
    },
    {
        displayName: 'Sản phẩm',
        iconName: 'solar:bag-3-outline',
        route: 'product/review',
        roles: [environment.roles.admin],
        children: [
            {
                displayName: 'Đánh giá sản phẩm',
                iconName: 'solar:chat-round-like-linear',
                route: 'product/review',
                roles: [environment.roles.admin]
            }
        ],
    },
    {
        displayName: 'Tài chính',
        iconName: 'solar:dollar-bold',
        route: 'finance/settlement',
        roles: [environment.roles.admin],
        children: [
            {
                displayName: 'Đơn hàng đã đối soát',
                iconName: 'solar:cart-check-linear',
                route: 'finance/settlement',
                roles: [environment.roles.admin]
            }
        ],
    },
    {
        displayName: 'Thống kê',
        iconName: 'solar:chart-2-bold',
        route: 'warehouse',
        roles: [environment.roles.warehouseManager, environment.roles.warehouseStaff],
        children: [
            {
                displayName: 'Top Sản phẩm / SKUs',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'warehouse/stats/skus',
                roles: [environment.roles.admin, environment.roles.warehouseManager, environment.roles.warehouseStaff]
            }
        ]
    },
    {
        displayName: 'Admin',
        iconName: 'solar:settings-bold',
        roles: [environment.roles.admin],
        children: [
            {
                displayName: 'Cập nhật thông tin Affiliate',
                iconName: 'solar:info-circle-bold',
                route: 'admin/order/affiliate/update',
                roles: [environment.roles.admin]
            },
            {
                displayName: 'Shop',
                iconName: 'solar:shop-outline',
                roles: [environment.roles.admin],
                children: [
                    {
                        displayName: 'Quản lý sản phẩm',
                        iconName: 'solar:code-scan-bold',
                        route: 'admin/shop/product/search',
                        roles: [environment.roles.admin]
                    },
                    {
                        displayName: 'Quản lý SKUs',
                        iconName: 'solar:code-scan-broken',
                        route: 'admin/shop/product/skus/search',
                        roles: [environment.roles.admin]
                    },
                    {
                        displayName: 'Quản lý chi phí',
                        iconName: 'solar:dollar-bold',
                        route: 'admin/shop/expense',
                        roles: [environment.roles.admin]
                    }
                ]
            },
            {
                displayName: 'Thống kê',
                iconName: 'solar:chart-2-bold',
                roles: [environment.roles.admin],
                children: [
                    {
                        displayName: 'Top Sản phẩm / SKUs',
                        iconName: 'solar:pie-chart-2-linear',
                        route: 'admin/stats/top-product',
                        roles: [environment.roles.admin]
                    }
                ]
            },
            {
                displayName: 'Hệ thống',
                iconName: 'solar:settings-minimalistic-bold',
                roles: [environment.roles.admin],
                children: [
                    {
                        displayName: 'Người dùng',
                        iconName: 'solar:users-group-rounded-outline',
                        route: 'admin/system/manage-user',
                        roles: [environment.roles.admin]
                    },
                    {
                        displayName: 'Vai trò',
                        iconName: 'solar:user-id-outline',
                        route: 'admin/system/manage-role',
                        roles: [environment.roles.admin]
                    },
                    {
                        displayName: 'Route',
                        iconName: 'solar:server-path-outline',
                        route: 'admin/system/manage-route',
                        roles: [environment.roles.admin]
                    }
                ]
            }
        ],
    },
];
