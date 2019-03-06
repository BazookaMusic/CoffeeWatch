import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCoffeeshopComponent } from './new-coffeeshop.component';

describe('NewCoffeeshopComponent', () => {
  let component: NewCoffeeshopComponent;
  let fixture: ComponentFixture<NewCoffeeshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCoffeeshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCoffeeshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
