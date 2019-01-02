import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeShopPreviewComponent } from './coffee-shop-preview.component';

describe('CoffeeShopPreviewComponent', () => {
  let component: CoffeeShopPreviewComponent;
  let fixture: ComponentFixture<CoffeeShopPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeShopPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeShopPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
