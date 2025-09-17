import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppHorizontalHeaderComponent} from './app-horizontal-header.component';

describe('AppHorizontalHeaderComponent', () => {
    let component: AppHorizontalHeaderComponent;
    let fixture: ComponentFixture<AppHorizontalHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppHorizontalHeaderComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AppHorizontalHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
