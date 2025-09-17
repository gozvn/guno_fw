import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import moment from "moment";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../services/authentication.service";
import {SidenavService} from "../../../core/services/sidenav.service";
import {Location} from "@angular/common";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BaseComponent} from "../../../core/components/base-component";
import {FormControl} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {StatsDashboardService} from "../../services/stats.dashboard.service";

@Component({
    selector: 'app-dashboard-page-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class DashboardPageHomeComponent extends BaseComponent implements OnInit, OnDestroy {

    stats: any = [];
    statsYesterday: any = [];

    statsItems: any = [];
    creator: any = null;

    totalOrders = 0;
    totalAmount = 0;
    totalRevenue = 0;

    totalOrdersYesterday = 0;
    totalAmountYesterday = 0;
    totalRevenueYesterday = 0;

    creators: any = [];
    creatorControl = new FormControl('');
    creatorSubscription: any;
    creatorSelected: any;
    creatorFilter: any;
    creatorFilteredOptions: Observable<any[]>;

    shopId: any = '-1';
    shops: any = [];

    presetDates = ['today', 'yesterday', 'last7days', 'last28days', 'this_week', 'this_month', 'customize'];

    presetAutoRefresh = 'not-set'
    presetAutoRefreshs = ['not-set', '5s', '10s', '20s'];

    reload = false;

    constructor(public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private sidenavService: SidenavService,
                private location: Location,
                private clipboard: Clipboard,
                private snackBar: MatSnackBar,
                private statsDashboardService: StatsDashboardService) {
        super(activeRoute, translateService, authenticationService, injector);

        this.activeRoute.queryParams.subscribe((params: any) => {
            this.creator = params.creator ?? null;
            this.creatorControl.setValue(params.creator || '');
            this.shopId = params['shop-id'] ??  this.shopId;
            this.presetAutoRefresh = params['refresh'] ?? 'not-set';
        });

        this.creatorFilteredOptions = this.creatorControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filterCreator(value || '')),
        );
    }

    override ngOnInit() {
        super.ngOnInit();
        this.getCreators();

        this.autoRefresh();
    }

    override ngOnDestroy() {
        super.ngOnDestroy();

        if (this._intervalAutoRefresh) {
            clearInterval(this._intervalAutoRefresh);
        }
    }

    private _filterCreator(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.creators.filter((option: any) => {
            return option.name.toLowerCase().includes(filterValue) || option.username.toLowerCase().includes(filterValue)
        });
    }

    getStats(loadingState = true) {
        const params: any = {
            loadingState: loadingState,
            fd: moment(this.startDate).format('YYYY-MM-DD'),
            td: moment(this.endDate).format('YYYY-MM-DD'),
        }
        if (this.shopId && this.shopId !== '-1') {
            params['shop-id'] = this.shopId;
        }

        const creatorName = this.creatorControl.value;
        const creator = this.creators.find((e: any) => e.name === creatorName);
        this.creator = null;
        if (creator) {
            this.creator = creator.username;
            params.creator = this.creator;
        }

        this.totalOrders = 0;
        this.totalAmount = 0;
        this.totalRevenue = 0;

        this.totalOrdersYesterday = 0;
        this.totalAmountYesterday = 0;
        this.totalRevenueYesterday = 0;

        const queries: any = [
            `refresh=` + this.presetAutoRefresh
        ];
        for (const i in params) {
            if (i === 'loadingState') {
                continue;
            }
            if (queries[i] !== "" && queries[i] !== null) {
                queries.push(i + "=" + params[i]);
            }
        }
        this.location.replaceState(
            `/dashboard`,
            queries.join("&")
        );
    }

    private _intervalAutoRefresh: any = null;
    autoRefresh() {
        let time = 0;
        switch (this.presetAutoRefresh) {
            case '5s':
                time = 5;
                break;
            case '10s':
                time = 10;
                break;
            case '20s':
                time = 20;
                break;
        }

        if (this._intervalAutoRefresh) {
            clearInterval(this._intervalAutoRefresh);
        }
        if (!time) return;

        this._intervalAutoRefresh = setInterval(() => {
            this.reload = true;
            this.getStats(false);
        }, time * 1000)
    }

    getCreators() {
        const params: any = {}
    }

    onSelectShopChange(event: any) {
        this.shopId = event.value;
        this.reload = true;
        this.getStats()
    }

    onSelectStatusChange(event: any) {
        // this.status = event.value;
        this.getStats();
    }

    onSelectStartDate(value: any) {
        this.endDate = value;
    }

    onSelectPresetAutoRefreshChange(event: any) {
        this.presetAutoRefresh = event.value;
        this.autoRefresh();
    }
}
