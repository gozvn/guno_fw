import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private requestCount = 0;
    private loadingSubject = new BehaviorSubject<boolean>(false);
    isLoading$ = this.loadingSubject.asObservable();

    show(): void {
        this.requestCount++;
        if (this.requestCount === 1) {
            this.loadingSubject.next(true);
        }
    }

    hide(): void {
        this.requestCount = Math.max(0, this.requestCount - 1);
        if (this.requestCount === 0) {
            this.loadingSubject.next(false);
        }
    }

    // Optional: force reset if needed
    reset(): void {
        this.requestCount = 0;
        this.loadingSubject.next(false);
    }
}
