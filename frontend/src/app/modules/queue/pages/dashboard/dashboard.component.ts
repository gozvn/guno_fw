import {Component, Injector} from '@angular/core';
import {BaseComponent} from "../../../core/components/base-component";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../services/authentication.service";
import {QueueService} from "../../services/queue.service";
import {Location} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-queue-page-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class QueuePageDashboardComponent extends BaseComponent {

    queues: any = [];
    interval: any = null;

    statuses = [
        { name: 'waiting', color: '#bf932b', count: 0 },
        { name: 'active', color: '#5b8ad7', count: 0 },
        { name: 'completed', color: '#2d864d', count: 0 },
        { name: 'failed', color: '#bf4040', count: 0 },
        { name: 'delayed', color: '#9374dc', count: 0 },
        { name: 'paused', color: '#a8a29f', count: 0 },
    ];

    constructor(public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private location: Location,
                private queueService: QueueService)
    {
        super(activeRoute, translateService, authenticationService, injector);

        this.activeRoute.queryParams.subscribe((params: any) => {
            this.currentPage = params.page ?? 1;
            this.pageSize = params.limit ?? 20;
            this.pageSize = parseInt(this.pageSize.toString());
        });
    }

    override ngOnInit() {
        super.ngOnInit();
        this.getQueues({
            loadingState: true
        });

        this.interval = setInterval(() => {
            this.getQueues();
        }, 6000);
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    getQueues(args = {
        loadingState: false
    }) {
        const params = {
            page: this.currentPage,
            jobsPerPage: this.pageSize,
            loadingState: args.loadingState
        }
        this.subscription = this.queueService.queues(params).subscribe((result: any) => {
            this.statuses.map(((status: any) => {
                status.count = 0;
                return status;
            }));
            this.queues = result?.queues;
            this.pageLength = result.count;
            this.queues.map((e: any) => {
                const counts = e.counts;
                this.statuses.map(((status: any) => {
                    status.count += counts[status.name] || 0;
                    return status;
                }));
                delete counts.completed;
                e.chart = {
                    series: Object.values(e.counts),
                    labels: Object.keys(e.counts),
                    chart: {
                        type: 'donut',
                        height: 205,
                        fontFamily: 'inherit',
                        foreColor: '#adb0bb',
                        animations: {
                            enabled: false, // Tắt animation
                        }
                    },
                    plotOptions: {
                        pie: {
                            startAngle: -90,
                            endAngle: 90,
                            offsetY: 10,
                            donut: {
                                size: '90%',
                            },
                        },
                    },
                    legend: {
                        show: false,
                    },
                    dataLabels: {
                        enabled: false,
                        name: {
                            show: true,
                        },
                    },
                    stroke: {
                        width: 0,
                        colors: 'var(--mdc-elevated-card-container-color)',
                    },
                    tooltip: {
                        fillSeriesColor: true,
                    },
                    colors: [
                        '#bf932b', // waiting
                        '#5b8ad7', // active
                        //'#2d864d', // completed
                        '#bf4040', // failed
                        '#9374dc', // delayed
                        '#a8a29f', // paused
                    ],
                };
                return e;
            });
        });

        const queries: any = [];
        queries.push(`page=${this.currentPage}`);
        queries.push(`limit=${this.pageSize}`);

        // this.ordersEdit = Object.assign([], this.orders);
        this.location.replaceState(
            `/queue/dashboard`,
            queries.join("&")
        );
    }

    getTotalJobByQueue(queue: any) {
        const counts: any = queue.counts;
        let total = 0;
        for (const i in counts) {
            total += counts[i]
        }
        return total;
    }

    trackById(index: number, item: any): number {
        return item.name; // Sử dụng name làm giá trị duy nhất
    }
}

