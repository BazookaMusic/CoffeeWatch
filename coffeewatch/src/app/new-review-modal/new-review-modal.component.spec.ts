import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReviewModalComponent } from './new-review-modal.component';

describe('NewReviewModalComponent', () => {
  let component: NewReviewModalComponent;
  let fixture: ComponentFixture<NewReviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
