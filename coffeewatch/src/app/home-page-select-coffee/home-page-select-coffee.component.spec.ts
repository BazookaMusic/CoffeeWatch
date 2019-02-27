import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageSelectCoffeeComponent } from './home-page-select-coffee.component';

describe('HomePageSelectCoffeeComponent', () => {
  let component: HomePageSelectCoffeeComponent;
  let fixture: ComponentFixture<HomePageSelectCoffeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageSelectCoffeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageSelectCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
