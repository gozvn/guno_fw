import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSystemRouteComponent } from './route.component';

describe('AdminSystemRouteComponent', () => {
  let component: AdminSystemRouteComponent;
  let fixture: ComponentFixture<AdminSystemRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSystemRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSystemRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
