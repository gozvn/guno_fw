import {Component, Injector} from '@angular/core';
import {BaseComponent} from "../../../core/components/base-component";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../services/authentication.service";
import {QueueService} from "../../services/queue.service";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmActionComponent} from "../../../core/components/dialogs/confirm-action/confirm-action.component";

@Component({
    selector: 'app-queue-page-queue',
    templateUrl: './queue.component.html',
    styleUrl: './queue.component.scss'
})
export class QueuePageQueueComponent extends BaseComponent {

    queueName: any = '';
    status = 'latest';

    statuses: any = [];
    colors: any = {
        latest: '',
        waiting: '#bf932b',
        active: '#5b8ad7',
        completed: '#2d864d',
        failed: '#bf4040',
        delayed: '#9374dc',
        paused: '#a8a29f',
    }
    queue: any = null;
    queues: any = [];
    interval: any = null;
    selectedIndex = 0;

    jobTabs: any = [];
    jobDataTabs = ['data', 'options', 'logs', 'error'];
    jobErrorDataTabs = ['error', 'data', 'options', 'logs'];

    constructor(public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private dialog: MatDialog,
                private location: Location,
                private queueService: QueueService) {
        super(activeRoute, translateService, authenticationService, injector);

        this.activeRoute.queryParams.subscribe((params: any) => {
            this.currentPage = params.page ?? 1;
            this.currentPage = this.currentPage < 0 ? 1 : this.currentPage;
            this.pageIndex = this.currentPage - 1;
            this.pageSize = params.limit ?? 20;
            this.pageSize = parseInt(this.pageSize.toString());
            this.status = params.status ?? this.status;
        });

        this.activeRoute.params.subscribe((params: any) => {
            this.queueName = params.queueName || null;
        });
    }

    override ngOnInit() {
        super.ngOnInit();

        this.selectedIndex = this.statuses.findIndex((e: any) => e === this.status)
        this.pageSize = 10;
        this.getQueues({
            loadingState: true
        });

        this.interval = setInterval(() => {
            this.getQueues();
        }, 6000)
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
        this.queues = [];

        const params = {
            page: this.currentPage,
            jobsPerPage: this.pageSize,
            loadingState: args.loadingState,
            activeQueue: this.queueName,
            status: this.status
        }

        this.jobTabs = this.jobDataTabs;
        if (this.status === 'failed') {
            this.jobTabs = this.jobErrorDataTabs;
        }

        this.subscription = this.queueService.queues(params).subscribe((result: any) => {
            this.queues = result?.queues;
            this.queue = this.queues.find((e: any) => e.name === this.queueName);

            this.statuses = this.queue ? this.queue?.statuses : [];
            this.selectedIndex = this.statuses.findIndex((e: any) => e === this.status);
            // this.pageLength = this.queue ? (this.queue?.pagination.pageCount - 1) * this.pageSize + parseInt(this.queue?.pagination.range.end) : 1;
            this.pageLength = this.queue.counts[this.status];
        });

        const queries: any = [];
        queries.push(`status=${this.status}`);
        queries.push(`page=${this.currentPage}`);
        queries.push(`limit=${this.pageSize}`);

        // this.ordersEdit = Object.assign([], this.orders);
        this.location.replaceState(
            `/queue/${this.queueName}`,
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

    onTabChange(event: any) {
        this.currentPage = 1;
        this.pageIndex = 0;
        this.status = this.statuses[event.index];
        const queries: any = [];
        queries.push(`status=${status}`);
        queries.push(`page=${this.currentPage}`);
        queries.push(`limit=${this.pageSize}`);

        // this.ordersEdit = Object.assign([], this.orders);
        this.location.replaceState(
            `/queue/${this.queueName}`,
            queries.join("&")
        );

        this.getQueues({
            loadingState: true
        });
    }

    onPageChange(event: any) {
        this.currentPage = event.pageIndex + 1;
        this.getQueues({
            loadingState: true
        });
    }

    cleanAll(args: any) {
        const params = {
            queueName: args.queueName,
            status: args.status
        }
        this.queueService.clean(params).subscribe((result: any) => {
            this.getQueues({
                loadingState: true
            });
        });
    }

    cleanJob(args: any) {
        const params = {
            queueName: args.queueName,
            jobId: args.jobId
        }
        this.queueService.cleanJob(params).subscribe((result: any) => {
            this.queue.jobs.filter((e: any) => e.id === args.jobId)
            this.getQueues({
                loadingState: true
            });
        });
    }

    retryJob(args: any) {
        const params = {
            queueName: args.queueName,
            jobId: args.jobId
        }
        this.queueService.retryJob(params).subscribe((result: any) => {
            this.queue.jobs.filter((e: any) => e.id === args.jobId)
            this.getQueues({
                loadingState: true
            });
        });
    }

    retryAll(args: any) {
        const params = {
            queueName: args.queueName
        }
        this.queueService.retryJob(params).subscribe((result: any) => {
            this.queue.jobs.filter((e: any) => e.id === args.jobId)
            this.getQueues({
                loadingState: true
            });
        });
    }

    openDialogConfirm(type: string, object: any, action = 'clean') {
        switch (type) {
            case 'retryAll':
                this.dialog.open(DialogConfirmActionComponent, {
                    data: {
                        callback: () => {
                            this.retryAll({
                                queueName: object.name, status: this.status
                            });
                        }
                    }
                });
                break;
            case 'queue':
                this.dialog.open(DialogConfirmActionComponent, {
                    data: {
                        callback: () => {
                            this.cleanAll({
                                queueName: object.name, status: this.status
                            });
                        }
                    }
                });
                break;
            case 'job':
                this.dialog.open(DialogConfirmActionComponent, {
                    data: {
                        callback: () => {
                            switch (action) {
                                case 'clean':
                                    this.cleanJob({
                                        queueName: object.queue.name, jobId: object.job.id
                                    });
                                    break;
                                case 'retry':
                                    this.retryJob({
                                        queueName: object.queue.name, jobId: object.job.id
                                    });
                                    break;
                            }
                        }
                    }
                });
                break;
        }
    }

    trackById(index: number, item: any): number {
        return item.id; // Sử dụng ID làm giá trị duy nhất
    }
}

