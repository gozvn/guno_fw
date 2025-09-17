import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QueuePageQueueComponent} from './queue.component';

describe('QueuePageQueueComponent', () => {
    let component: QueuePageQueueComponent;
    let fixture: ComponentFixture<QueuePageQueueComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [QueuePageQueueComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(QueuePageQueueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
