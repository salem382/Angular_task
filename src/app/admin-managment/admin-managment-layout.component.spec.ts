import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagmentLayoutComponent } from './admin-managment-layout.component';

describe('AdminManagmentLayoutComponent', () => {
  let component: AdminManagmentLayoutComponent;
  let fixture: ComponentFixture<AdminManagmentLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManagmentLayoutComponent]
    });
    fixture = TestBed.createComponent(AdminManagmentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
