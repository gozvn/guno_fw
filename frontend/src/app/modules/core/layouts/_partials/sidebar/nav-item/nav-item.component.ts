import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {TablerIconsModule} from "angular-tabler-icons";
import {MaterialModule} from "../../../../../../shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {NavService} from "../../../../../../services/nav.service";

@Component({
    selector: 'app-nav-item',
    standalone: true,
    imports: [
        CommonModule, RouterModule, TablerIconsModule, MaterialModule, TranslateModule
    ],
    templateUrl: './nav-item.component.html',
    styleUrl: './nav-item.component.scss'
})
export class AppNavItemComponent {
    @Input() depth: any;
    @Input() item: any;

    constructor(public navService: NavService, public router: Router) {
        if (this.depth === undefined) {
            this.depth = 0;
        }
    }

    ngOnInit() { }
    onItemSelected(item: any) {
        if (!item.children || !item.children.length) {
            this.router.navigate([item.route]);
        }
    }
}
