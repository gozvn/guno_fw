import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LayoutDefaultSidebarVerticalComponent} from './default-sidebar-vertical.component';

describe('LayoutDefaultSidebarVerticalComponent', () => {
    let component: LayoutDefaultSidebarVerticalComponent;
    let fixture: ComponentFixture<LayoutDefaultSidebarVerticalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LayoutDefaultSidebarVerticalComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LayoutDefaultSidebarVerticalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
