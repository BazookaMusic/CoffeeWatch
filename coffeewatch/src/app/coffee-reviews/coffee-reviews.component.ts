import { Component, OnInit, Input } from '@angular/core';
import { Coffee } from '../coffee';
import { CoffeeshopsService } from '../coffeeshops.service';

@Component({
  selector: 'app-coffee-reviews',
  templateUrl: './coffee-reviews.component.html',
  styleUrls: ['./coffee-reviews.component.css']
})
export class CoffeeReviewsComponent implements OnInit {

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
