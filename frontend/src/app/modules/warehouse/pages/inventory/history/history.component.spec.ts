import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehousePageInventoryHistoryComponent} from './history.component';

describe('WarehousePageInventoryHistoryComponent', () => {
    let component: WarehousePageInventoryHistoryComponent;
    let fixture: ComponentFixture<WarehousePageInventoryHistoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WarehousePageInventoryHistoryComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WarehousePageInventoryHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
