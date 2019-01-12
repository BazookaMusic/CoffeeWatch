import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSearchModalComponent } from './filter-search-modal.component';

describe('FilterSearchModalComponent', () => {
  let component: FilterSearchModalComponent;
  let fixture: ComponentFixture<FilterSearchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSearchModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
