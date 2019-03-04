import { Component, OnInit, Input } from '@angular/core';
import { Coffee } from '../coffee';
import { CoffeeshopsService, average } from '../coffeeshops.service';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { Review } from '../review';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-coffee-reviews',
  templateUrl: './coffee-reviews.component.html',
  styleUrls: ['./coffee-reviews.component.css'],
  animations: [
    trigger('fastFade', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(600)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ]),

  ]
})
export class CoffeeReviewsComponent implements OnInit {

  coffee: Coffee;
  reviews: Review[];

  numOfReviews: number;
  counters: number[];
  reviewPercentages: string[];
  avgRating: number;

  public newReviewControl: FormControl;

  constructor(private coffeeShopsService: CoffeeshopsService) { }

  ngOnInit()
  {
    this.newReviewControl = new FormControl();

    this.coffeeShopsService.getSelectedCoffee().pipe(flatMap(id => this.coffeeShopsService.getCoffee(id))).subscribe(coffee => 
      {
        if (coffee !== undefined) this.coffee = coffee;
      });
    this.refresh();

    this.coffeeShopsService.reviewChange$.subscribe(change =>
      {
        if (change)
        {
          this.refresh();
        }
      });
  }

  refresh()
  {
    
    this.coffeeShopsService.getSelectedCoffee().pipe(flatMap(id => this.coffeeShopsService.getCoffeeReviews(id))).subscribe(reviews => 
      {
        if (reviews !== undefined)
        {
          this.reviews = reviews;
          this.setReviewsStatistics();
          this.avgRating = +average(this.reviews.map(review => review.rating)).toFixed(2);
          this.numOfReviews = this.reviews.length;
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