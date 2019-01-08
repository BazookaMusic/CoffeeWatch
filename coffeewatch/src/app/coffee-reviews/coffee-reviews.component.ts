import { Component, OnInit, Input } from '@angular/core';
import { Coffee } from '../coffee';
import { CoffeeshopsService } from '../coffeeshops.service';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-coffee-reviews',
  templateUrl: './coffee-reviews.component.html',
  styleUrls: ['./coffee-reviews.component.css']
})
export class CoffeeReviewsComponent implements OnInit {

  selectedCoffeeID: number;
  selectedCoffee: Coffee;
  public newReviewControl: FormControl;

  constructor(private coffeeShopsService: CoffeeshopsService) { }

  ngOnInit()
  {
    this.newReviewControl = new FormControl();

    this.coffeeShopsService.getSelectedCoffee().subscribe(id => 
      {
        this.selectedCoffeeID = id;
        this.coffeeShopsService.getCoffee(this.selectedCoffeeID).subscribe(coffee => this.selectedCoffee = coffee);
      });

  }


}
