import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeDescriptionComponent } from './coffee-description.component';

describe('CoffeeDescriptionComponent', () => {
  let component: CoffeeDescriptionComponent;
  let fixture: ComponentFixture<CoffeeDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
