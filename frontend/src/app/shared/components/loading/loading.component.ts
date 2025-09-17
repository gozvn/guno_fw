import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {LoadingService} from "../../../services/loading.service";

@Component({
    selector: 'app-shared-loading',
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.scss'
})
export class SharedLoadingComponent implements OnInit, AfterViewInit {
    isLoading = false;

    constructor(public loadingService: LoadingService,
                private ngZone: NgZone,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.loadingService.isLoading$.subscribe((value) => {
            this.ngZone.run(() => {
                setTimeout(() => {
                    this.isLoading = value;
                });
            });
        });
    }

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }
}
