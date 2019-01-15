import { Component, OnInit, Input } from '@angular/core';
import { Coffee } from '../coffee';
import { CoffeeshopsService } from '../coffeeshops.service';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { Review } from '../review';

@Component({
  selector: 'app-coffee-reviews',
  templateUrl: './coffee-reviews.component.html',
  styleUrls: ['./coffee-reviews.component.css']
})
export class CoffeeReviewsComponent implements OnInit {

  coffee: Coffee;
  reviews: Review[];

  numOfReviews: number;
  counters: number[];
  reviewPercentages: string[];

  public newReviewControl: FormControl;

  constructor(private coffeeShopsService: CoffeeshopsService) { }

  ngOnInit()
  {
    this.newReviewControl = new FormControl();

    this.coffeeShopsService.getSelectedCoffee().pipe(flatMap(id => this.coffeeShopsService.getCoffee(id))).subscribe(coffee => 
      {
        if(coffee !== undefined) this.coffee = coffee;
      });
    this.coffeeShopsService.getSelectedCoffee().pipe(flatMap(id => this.coffeeShopsService.getCoffeeReviews(id))).subscribe(reviews => 
      {
        if (reviews !== undefined)
        {
          this.reviews = reviews;
          this.setReviewsStatistics();
        }
      });
  }

  setReviewsStatistics()
  {
    this.counters = [0, 0, 0, 0, 0];
    this.numOfReviews = this.reviews.length;
    for (let i = 0; i < this.numOfReviews; i++)
    {
      this.counters[this.reviews[i].rating - 1]++;
    }
    this.reviewPercentages = this.counters.map(counter => Math.round((counter / this.numOfReviews) * 100)).map(num => num + "%");
  }
}