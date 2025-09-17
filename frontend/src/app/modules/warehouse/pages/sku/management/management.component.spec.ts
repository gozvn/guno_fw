import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehousePageSkuManagementComponent} from './management.component';

describe('WarehousePageSkuManagementComponent', () => {
    let component: WarehousePageSkuManagementComponent;
    let fixture: ComponentFixture<WarehousePageSkuManagementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WarehousePageSkuManagementComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WarehousePageSkuManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
