import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeShopTinyComponent } from './coffee-shop-tiny.component';

describe('CoffeeShopTinyComponent', () => {
  let component: CoffeeShopTinyComponent;
  let fixture: ComponentFixture<CoffeeShopTinyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeShopTinyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeShopTinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
