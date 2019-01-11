import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeShopMediumComponent } from './coffee-shop-medium.component';

describe('CoffeeShopMediumComponent', () => {
  let component: CoffeeShopMediumComponent;
  let fixture: ComponentFixture<CoffeeShopMediumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeShopMediumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeShopMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
