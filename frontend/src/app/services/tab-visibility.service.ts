// tab-visibility.service.ts
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TabVisibilityService implements OnDestroy {
    private isTabActiveSubject = new BehaviorSubject<boolean>(document.visibilityState === 'visible');
    public isTabActive$ = this.isTabActiveSubject.asObservable();

    private visibilityHandler = () => {
        const isVisible = document.visibilityState === 'visible';
        this.ngZone.run(() => this.isTabActiveSubject.next(isVisible));
    };

    constructor(private ngZone: NgZone) {
        document.addEventListener('visibilitychange', this.visibilityHandler);
    }

    ngOnDestroy(): void {
        document.removeEventListener('visibilitychange', this.visibilityHandler);
    }

    get isTabActive(): boolean {
        return this.isTabActiveSubject.value;
    }
}
