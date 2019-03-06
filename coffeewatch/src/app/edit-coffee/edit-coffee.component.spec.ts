import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoffeeComponent } from './edit-coffee.component';

describe('EditCoffeeComponent', () => {
  let component: EditCoffeeComponent;
  let fixture: ComponentFixture<EditCoffeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCoffeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
