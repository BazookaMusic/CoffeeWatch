import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageSearchResultsComponent } from './home-page-search-results.component';

describe('HomePageSearchResultsComponent', () => {
  let component: HomePageSearchResultsComponent;
  let fixture: ComponentFixture<HomePageSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
