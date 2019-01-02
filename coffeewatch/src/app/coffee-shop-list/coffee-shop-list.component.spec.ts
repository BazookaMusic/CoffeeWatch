import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeShopListComponent } from './coffee-shop-list.component';

describe('CoffeeShopListComponent', () => {
  let component: CoffeeShopListComponent;
  let fixture: ComponentFixture<CoffeeShopListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeShopListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeShopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
