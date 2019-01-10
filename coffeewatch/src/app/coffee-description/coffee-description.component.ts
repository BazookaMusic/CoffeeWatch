import { Component, OnInit } from '@angular/core';
import { Coffee } from '../coffee';
import { CoffeeshopsService } from '../coffeeshops.service';

@Component({
  selector: 'app-coffee-description',
  templateUrl: './coffee-description.component.html',
  styleUrls: ['./coffee-description.component.css']
})
export class CoffeeDescriptionComponent implements OnInit
{
  selectedCoffeeID: number;
  selectedCoffee: Coffee;

  constructor(private coffeeShopsService: CoffeeshopsService) { }

  ngOnInit()
  {
    this.coffeeShopsService.getSelectedCoffee().subscribe(id =>
    {
      this.selectedCoffeeID = id;
      this.coffeeShopsService.getCoffee(this.selectedCoffeeID).subscribe(coffee => this.selectedCoffee = coffee);
    });

  }
}
