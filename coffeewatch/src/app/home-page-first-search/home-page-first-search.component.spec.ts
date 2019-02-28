import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageFirstSearchComponent } from './home-page-first-search.component';

describe('HomePageSelectCoffeeComponent', () => {
  let component: HomePageFirstSearchComponent;
  let fixture: ComponentFixture<HomePageFirstSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageFirstSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageFirstSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
