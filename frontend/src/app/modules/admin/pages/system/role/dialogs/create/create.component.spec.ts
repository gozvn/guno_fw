import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDialogSystemCreateRoleComponent } from './create.component';

describe('AdminDialogSystemCreateRoleComponent', () => {
  let component: AdminDialogSystemCreateRoleComponent;
  let fixture: ComponentFixture<AdminDialogSystemCreateRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDialogSystemCreateRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDialogSystemCreateRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
