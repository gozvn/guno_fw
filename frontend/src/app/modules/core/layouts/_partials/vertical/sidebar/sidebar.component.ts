import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import {AppVerticalBrandingComponent} from './branding.component';
import {TablerIconsModule} from 'angular-tabler-icons';
import {MaterialModule} from "../../../../../../shared/modules/material.module";
import {AppBrandingComponent} from "../../app-branding/app-branding.component";
import {AppVerticalNavItemComponent} from "./nav-item/nav-item.component";
import {sidenavItems} from './sidebar-data';
import {CommonModule} from "@angular/common";
import {NavItem} from "./nav-item/nav-item";
import {environment} from "../../../../../../../environments/environment";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, AppVerticalBrandingComponent, AppVerticalNavItemComponent, AppBrandingComponent, TablerIconsModule, MaterialModule],
    templateUrl: './sidebar.component.html',
})
export class AppVerticalSidebarComponent implements OnInit {

    navItems = sidenavItems;
    parentActive = '';

    constructor() {}

    @Input() user: any;
    @Input() showToggle = true;
    @Output() toggleMobileNav = new EventEmitter<void>();
    @Output() toggleCollapsed = new EventEmitter<void>();

    ngOnInit(): void {
    }

    isAllow(item: NavItem) {
        if (!this.user) return false;

        if (this.user.roleId === environment.roles.superAdmin || this.user.roleId === environment.roles.admin) {
            return true;
        }

        return item?.roles?.includes(this.user.roleId);
    }
}
