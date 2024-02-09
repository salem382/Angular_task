import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExamComponent } from './all-exam.component';

describe('AllExamComponent', () => {
  let component: AllExamComponent;
  let fixture: ComponentFixture<AllExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllExamComponent]
    });
    fixture = TestBed.createComponent(AllExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
