import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuanComponent } from './tuan.component';

describe('TuanComponent', () => {
  let component: TuanComponent;
  let fixture: ComponentFixture<TuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TuanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
