import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehousePageStocktakingPartialDetailComponent} from './detail.component';

describe('WarehousePageStocktakingPartialDetailComponent', () => {
    let component: WarehousePageStocktakingPartialDetailComponent;
    let fixture: ComponentFixture<WarehousePageStocktakingPartialDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WarehousePageStocktakingPartialDetailComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WarehousePageStocktakingPartialDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
