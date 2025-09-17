import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogConfirmReloadNewVersionComponent} from './confirm-reload-new-version.component';

describe('DialogConfirmReloadNewVersionComponent', () => {
    let component: DialogConfirmReloadNewVersionComponent;
    let fixture: ComponentFixture<DialogConfirmReloadNewVersionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DialogConfirmReloadNewVersionComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DialogConfirmReloadNewVersionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
