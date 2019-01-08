import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeReviewsComponent } from './coffee-reviews.component';

describe('CoffeeReviewsComponent', () => {
  let component: CoffeeReviewsComponent;
  let fixture: ComponentFixture<CoffeeReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
