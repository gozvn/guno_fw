import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehousePageStocktakingPartialCreateComponent} from './create.component';

describe('WarehousePageStocktakingPartialCreateComponent', () => {
    let component: WarehousePageStocktakingPartialCreateComponent;
    let fixture: ComponentFixture<WarehousePageStocktakingPartialCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WarehousePageStocktakingPartialCreateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WarehousePageStocktakingPartialCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
