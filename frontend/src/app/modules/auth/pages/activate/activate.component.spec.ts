import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthPageActivateComponent} from './activate.component';

describe('AuthPageActivateComponent', () => {
    let component: AuthPageActivateComponent;
    let fixture: ComponentFixture<AuthPageActivateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AuthPageActivateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AuthPageActivateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
