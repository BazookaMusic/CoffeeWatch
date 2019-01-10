import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCoffeeModalComponent } from './new-coffee-modal.component';

describe('NewCoffeeModalComponent', () => {
  let component: NewCoffeeModalComponent;
  let fixture: ComponentFixture<NewCoffeeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCoffeeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCoffeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
