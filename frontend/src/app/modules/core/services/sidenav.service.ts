import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class SidenavService {
    private sidenav!: MatSidenav;

    private applySubject = new Subject<string>(); // Tạo Subject
    apply$ = this.applySubject.asObservable(); // Observable để lắng nghe

    apply(data: any) {
        this.applySubject.next(data); // Phát sự kiện
    }

    setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    toggle(): void {
        this.sidenav.toggle();
    }

    open(): void {
        this.sidenav.open();
    }

    close(): void {
        this.sidenav.close();
    }

    isOpen(): boolean {
        return this.sidenav?.opened || false;
    }
}
