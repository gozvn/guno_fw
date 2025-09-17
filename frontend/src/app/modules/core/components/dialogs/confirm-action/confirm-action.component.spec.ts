import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogConfirmActionComponent} from './confirm-action.component';

describe('DialogConfirmActionComponent', () => {
    let component: DialogConfirmActionComponent;
    let fixture: ComponentFixture<DialogConfirmActionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DialogConfirmActionComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DialogConfirmActionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
