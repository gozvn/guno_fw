import {NavItem} from '../../vertical/sidebar/nav-item/nav-item';
import {environment} from "../../../../../../../environments/environment";

export const sidenavItems: NavItem[] = [
    {
        navCap: 'Report',
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
        divider: true,
        navCap: 'Orders',
    },
    {
        displayName: 'Đơn hàng',
        iconName: 'solar:cart-check-linear',
        route: 'order/management',
        roles: []
    },
    {
        displayName: 'Trả hàng / Hoàn tiền',
        iconName: 'solar:square-double-alt-arrow-left-outline',
        route: 'order/return-refund',
        queryParams: {
            'return-type': 'RETURN_AND_REFUND'
        },
        roles: [environment.roles.admin]
    },
    {
        displayName: 'Sản phẩm',
        iconName: 'solar:bag-3-outline',
        route: 'product/review',
        roles: [environment.roles.admin],
        children: [
            {
                displayName: 'Đánh giá sản phẩm',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'product/review',
                roles: [environment.roles.admin]
            }
        ],
    },
    {
        divider: true,
        navCap: 'Sản phẩm',
    },
    {
        displayName: 'Sản phẩm',
        iconName: 'solar:t-shirt-outline',
        route: 'product/management',
        roles: [environment.roles.admin]
    },
    {
        displayName: 'Nhà cung cấp',
        iconName: 'solar:suspension-outline',
        route: 'product/supplier/management',
        roles: [environment.roles.admin]
    },
    {
        divider: true,
        navCap: 'Warehouse',
    },
    {
        displayName: 'Kho hàng',
        iconName: 'solar:shop-line-duotone',
        route: 'warehouse',
        roles: [environment.roles.warehouseManager, environment.roles.warehouseStaff],
        children: [
            {
                displayName: 'Tồn kho',
                iconName: 'solar:layers-minimalistic-linear',
                route: 'warehouse/sku/management',
                roles: [environment.roles.admin]
            },
            {
                displayName: 'Kiểm hàng',
                iconName: 'solar:checklist-line-duotone',
                route: 'warehouse/stocktaking/management',
                roles: [environment.roles.admin]
            },
            {
                displayName: 'Nhập hàng',
                iconName: 'solar:import-linear',
                route: 'warehouse/receipt/management',
                roles: [environment.roles.admin]
            },
            {
                displayName: 'Xuất hàng',
                iconName: 'solar:export-line-duotone',
                route: 'warehouse/delivery/management',
                roles: [environment.roles.admin]
            },
            {
                displayName: 'Lịch sử xuất nhập',
                iconName: 'solar:history-line-duotone',
                route: 'warehouse/inventory/history',
                roles: [environment.roles.admin]
            }
        ]
    },
    {
        displayName: 'Thống kê',
        iconName: 'solar:chart-square-linear',
        route: 'warehouse',
        roles: [environment.roles.warehouseManager, environment.roles.warehouseStaff],
        children: [
            {
                displayName: 'SKUs',
                iconName: 'solar:shop-linear',
                route: 'warehouse/stats/skus',
                roles: [environment.roles.admin]
            }
        ]
    },
    {
        divider: true,
        navCap: 'Tài chính',
    },
    {
        displayName: 'Công nợ',
        iconName: 'solar:dollar-linear',
        route: 'finance/dept',
        roles: []
    },
    {
        divider: true,
        navCap: 'Admin',
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
