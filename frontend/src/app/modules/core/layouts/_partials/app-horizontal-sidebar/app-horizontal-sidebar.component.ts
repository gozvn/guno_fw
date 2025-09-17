import {
    Component,
    OnInit,
    Input,
    ChangeDetectorRef,
    OnChanges,
} from '@angular/core';
import {navItems} from '../sidebar/sidebar-data';
import {Router} from '@angular/router';
import {NavService} from '../../../services/nav.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {AppHorizontalNavItemComponent} from "../horizontal/sidebar/nav-item/nav-item.component";

@Component({
    selector: 'app-horizontal-sidebar',
    standalone: true,
    imports: [AppHorizontalNavItemComponent, CommonModule],
    templateUrl: './app-horizontal-sidebar.component.html',
})
export class AppHorizontalSidebarComponent implements OnInit {
    navItems = navItems;
    parentActive = '';

    mobileQuery: MediaQueryList;
    private readonly _mobileQueryListener: () => void;

    constructor(
        public navService: NavService,
        public router: Router,
        media: MediaMatcher,
        changeDetectorRef: ChangeDetectorRef
    ) {
        this.mobileQuery = media.matchMedia('(min-width: 1100px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.router.events.subscribe(
            () => (this.parentActive = this.router.url.split('/')[1])
        );
    }

    ngOnInit(): void {
    }
}
