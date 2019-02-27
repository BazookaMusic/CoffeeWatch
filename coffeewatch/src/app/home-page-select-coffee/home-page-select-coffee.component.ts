import { Component, OnInit } from '@angular/core';
import { CoffeeshopsService } from '../coffeeshops.service';
import { coffeeCategories } from '../coffee';

@Component({
  selector: 'app-home-page-select-coffee',
  templateUrl: './home-page-select-coffee.component.html',
  styleUrls: ['./home-page-select-coffee.component.css']
})

export class HomePageSelectCoffeeComponent implements OnInit
{
  selected = 0;
  categories = [];

  constructor(private coffeeShopsService: CoffeeshopsService) { }

  ngOnInit() {
  }

  select(index: number)
  {
    this.selected = index;
    const filters = this.coffeeShopsService.getFilters();
    filters.category = coffeeCategories[index];
    this.coffeeShopsService.setFilters(filters);
    console.log(filters);
  }
}
