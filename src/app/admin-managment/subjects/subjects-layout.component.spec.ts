import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsLayoutComponent } from './subjects-layout.component';

describe('SubjectsLayoutComponent', () => {
  let component: SubjectsLayoutComponent;
  let fixture: ComponentFixture<SubjectsLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectsLayoutComponent]
    });
    fixture = TestBed.createComponent(SubjectsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
