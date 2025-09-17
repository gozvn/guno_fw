import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDialogSystemPermissionUserComponent } from './permission.component';

describe('AdminDialogSystemPermissionUserComponent', () => {
  let component: AdminDialogSystemPermissionUserComponent;
  let fixture: ComponentFixture<AdminDialogSystemPermissionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDialogSystemPermissionUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDialogSystemPermissionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
