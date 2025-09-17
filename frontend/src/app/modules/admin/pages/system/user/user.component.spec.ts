import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSystemUserComponent } from './user.component';

describe('AdminSystemUserComponent', () => {
  let component: AdminSystemUserComponent;
  let fixture: ComponentFixture<AdminSystemUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSystemUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSystemUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
