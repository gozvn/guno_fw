import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBrandingComponent } from './app-branding.component';

describe('AppBrandingComponent', () => {
  let component: AppBrandingComponent;
  let fixture: ComponentFixture<AppBrandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppBrandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppBrandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
