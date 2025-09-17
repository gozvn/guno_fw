import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LandingPageLayoutDefaultComponent} from './default.component';

describe('LandingPageLayoutDefaultComponent', () => {
    let component: LandingPageLayoutDefaultComponent;
    let fixture: ComponentFixture<LandingPageLayoutDefaultComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LandingPageLayoutDefaultComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LandingPageLayoutDefaultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
