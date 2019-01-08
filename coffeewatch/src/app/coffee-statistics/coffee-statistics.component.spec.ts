import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeStatisticsComponent } from './coffee-statistics.component';

describe('CoffeeStatisticsComponent', () => {
  let component: CoffeeStatisticsComponent;
  let fixture: ComponentFixture<CoffeeStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
