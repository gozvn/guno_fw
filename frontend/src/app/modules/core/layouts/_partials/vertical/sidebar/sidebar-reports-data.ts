import {NavItem} from '../../vertical/sidebar/nav-item/nav-item';
import {environment} from "../../../../../../../environments/environment";

export const sidenavReportItems: NavItem[] = [
    {
        navCap: 'Report',
    },
    {
        displayName: 'Báo cáo',
        iconName: 'solar:chart-line-duotone',
        route: 'reports/overview',
        roles: [environment.roles.admin],
        children: [
            {
                displayName: 'Tổng quan',
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: 'reports/overview',
                roles: []
            }
        ]
    }
];
