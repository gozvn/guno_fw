import {
    Component,
    OnInit,
    Input,
    ChangeDetectorRef,
    OnChanges, HostListener, ViewChild, ElementRef, AfterViewInit, Renderer2, NgZone,
} from '@angular/core';
import {navItems} from './sidebar-data';
import {Router} from '@angular/router';
import {NavService} from '../../../../services/nav.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {AppHorizontalNavItemComponent} from './nav-item/nav-item.component';
import {CommonModule} from '@angular/common';
import {NavItem} from "../../vertical/sidebar/nav-item/nav-item";
import {environment} from "../../../../../../../environments/environment";

@Component({
    selector: 'app-horizontal-sidebar',
    standalone: true,
    imports: [AppHorizontalNavItemComponent, CommonModule],
    templateUrl: './sidebar.component.html',
})
export class AppHorizontalSidebarComponent implements OnInit, AfterViewInit {

    @Input() user: any;

    navItems = navItems;
    parentActive = '';

    mobileQuery: MediaQueryList;
    private readonly _mobileQueryListener: () => void;

    @ViewChild('horizontalSidebar') sidebar!: ElementRef;

    private stickyOffset: number = 0;
    private scrollListener: any;

    constructor(
        public navService: NavService,
        public router: Router,
        media: MediaMatcher,
        changeDetectorRef: ChangeDetectorRef,
        private renderer: Renderer2,
        private zone: NgZone
    ) {
        this.mobileQuery = media.matchMedia('(min-width: 1100px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.router.events.subscribe(
            () => (this.parentActive = this.router.url.split('/')[1])
        );

        window.addEventListener('scroll', () => {
            console.log('Scroll Y Offset:', window.pageYOffset);
        });
    }

    private handleScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll >= this.stickyOffset) {
            this.sidebar.nativeElement.classList.add('sticky');
        } else {
            this.sidebar.nativeElement.classList.remove('sticky');
        }
    }

    ngOnInit(): void {
        this.parentActive = this.router.url.split('/')[1];
    }

    ngAfterViewInit() {
        this.stickyOffset = this.sidebar.nativeElement.offsetTop;

        this.zone.runOutsideAngular(() => {
            // Lắng nghe sự kiện scroll trên window
            this.scrollListener = this.renderer.listen('window', 'scroll', () => {
                console.log('Scroll container:', document.scrollingElement || document.documentElement);
                this.handleScroll();
            });
        });
    }

    ngOnDestroy() {
        // Hủy sự kiện scroll khi component bị phá hủy
        if (this.scrollListener) {
            this.scrollListener();
        }
    }

    isAllow(item: NavItem) {
        if (!this.user) return false;

        if (this.user.roleId === environment.roles.superAdmin || this.user.roleId === environment.roles.admin) {
            return true;
        }

        return item?.roles?.includes(this.user.roleId);
    }
}
