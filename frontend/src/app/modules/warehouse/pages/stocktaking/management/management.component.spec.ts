import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehousePageStocktakingManagementComponent} from './management.component';

describe('WarehousePageStocktakingManagementComponent', () => {
    let component: WarehousePageStocktakingManagementComponent;
    let fixture: ComponentFixture<WarehousePageStocktakingManagementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WarehousePageStocktakingManagementComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WarehousePageStocktakingManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
