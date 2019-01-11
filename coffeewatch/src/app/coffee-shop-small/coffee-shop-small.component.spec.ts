import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeShopSmallComponent } from './coffee-shop-small.component';

describe('CoffeeShopPreviewComponent', () => {
  let component: CoffeeShopSmallComponent;
  let fixture: ComponentFixture<CoffeeShopSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoffeeShopSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeShopSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
