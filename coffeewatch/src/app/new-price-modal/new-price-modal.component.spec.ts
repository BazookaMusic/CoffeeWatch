import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPriceModalComponent } from './new-price-modal.component';

describe('NewPriceModalComponent', () => {
  let component: NewPriceModalComponent;
  let fixture: ComponentFixture<NewPriceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPriceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPriceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
