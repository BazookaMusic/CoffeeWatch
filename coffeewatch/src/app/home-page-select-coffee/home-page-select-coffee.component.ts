import { Component, OnInit } from '@angular/core';
import { CoffeeshopsService } from '../coffeeshops.service';

@Component({
  selector: 'app-home-page-select-coffee',
  templateUrl: './home-page-select-coffee.component.html',
  styleUrls: ['./home-page-select-coffee.component.css']
})

export class HomePageSelectCoffeeComponent implements OnInit
{
  categories = [];

  constructor(private coffeeShopsService: CoffeeshopsService) { }

  ngOnInit() {
  }

}
