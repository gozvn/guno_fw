import {Component, Injector, OnDestroy} from '@angular/core';
import {BaseComponent} from "../../../../core/components/base-component";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../../services/authentication.service";
import {SidenavService} from "../../../../core/services/sidenav.service";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {RevenueService} from "../../../services/revenue.service";
import moment from "moment";
import {Location} from "@angular/common";

@Component({
    selector: 'app-reports-page-overview',
    templateUrl: './revenue.component.html',
    styleUrl: './revenue.component.scss'
})
export class ReportsPageOverviewRevenueComponent extends BaseComponent implements OnDestroy {
    selectedTabIndex = 0;
    tab = 'revenue'; // to_process | completed | closed
    tabs = ['revenue', 'expense', 'customer'];
    tabsStatues: any = {
        to_ship: ['AWAITING_SHIPMENT', 'AWAITING_COLLECTION'],
        shipped: ['IN_TRANSIT', 'DELIVERED']
    };
    tabsStats: any = [];

    type = 'revenue';

    types = [
        {name: 'revenue', color: '#bf932b', icon: 'coin', count: 0},
        {name: 'expense', color: '#5b8ad7', icon: 'message-dollar', count: 0},
        {name: 'customer', color: '#2d864d', icon: 'users-group', count: 0}
    ];


    totalRevenue = 0;
    totalOrders = 0;
    totalSources = 0;

    constructor(public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private location: Location,
                private revenueService: RevenueService) {
        super(activeRoute, translateService, authenticationService, injector);

        this.tabs.forEach((e: any) => {
            this.tabsStats[e] = 0;
        });
    }

    override ngOnInit() {
        super.ngOnInit();
        this.search();
    }

    onTabChange(event: MatTabChangeEvent): void {
        if (this.loadingState) return;
        this.tab = this.tabs[event.index];
        switch (this.tab) {

        }
        this.pageIndex = 0;
        this.currentPage = 1;
    }

    search(loadingState = true) {
        this.widgetLoadingState = true;
        const params: any = {
            page: this.currentPage,
            limit: this.pageSize,
            fd: moment(this.startDate).format('YYYY-MM-DD'),
            td: moment(this.endDate).format('YYYY-MM-DD'),
        }

        this.revenueService.generate(params).subscribe((result: any) => {
            this.totalRevenue = result?.overview?.totalRevenue ?? 0;
            this.totalOrders = result?.overview?.totalOrders ?? 0;
            this.totalSources = result?.details?.length ?? 0;
        });

        const queries: any = [];
        for (const i in params) {
            if (i === 'loadingState') {
                continue;
            }
            if (queries[i] !== "" && queries[i] !== null) {
                queries.push(i + "=" + params[i]);
            }
        }
        this.location.replaceState(
            `/reports/overview/revenue`,
            queries.join("&")
        );
    }
}
