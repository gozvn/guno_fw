import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductPageManagementComponent} from './management.component';

describe('ProductPageManagementComponent', () => {
    let component: ProductPageManagementComponent;
    let fixture: ComponentFixture<ProductPageManagementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductPageManagementComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductPageManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
