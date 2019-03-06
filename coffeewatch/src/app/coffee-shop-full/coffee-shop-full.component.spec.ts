import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeShopFullComponent } from './coffee-shop-full.component';

describe('CoffeeShopFullComponent', () => {
  let component: CoffeeShopFullComponent;
  let fixture: ComponentFixture<CoffeeShopFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeShopFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeShopFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
