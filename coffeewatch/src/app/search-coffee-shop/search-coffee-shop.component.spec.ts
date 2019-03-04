import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCoffeeShopComponent } from './search-coffee-shop.component';

describe('SearchCoffeeShopComponent', () => {
  let component: SearchCoffeeShopComponent;
  let fixture: ComponentFixture<SearchCoffeeShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCoffeeShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCoffeeShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
