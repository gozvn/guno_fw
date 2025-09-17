import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthPageSideLoginComponent} from './side-login.component';

describe('AuthPageSideLoginComponent', () => {
    let component: AuthPageSideLoginComponent;
    let fixture: ComponentFixture<AuthPageSideLoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AuthPageSideLoginComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AuthPageSideLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
