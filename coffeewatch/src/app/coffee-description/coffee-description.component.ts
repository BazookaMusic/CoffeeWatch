import { Component, OnInit } from '@angular/core';
import { Coffee } from '../coffee';
import { CoffeeshopsService } from '../coffeeshops.service';
import { flatMap } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-coffee-description',
  templateUrl: './coffee-description.component.html',
  styleUrls: ['./coffee-description.component.css'],
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
export class CoffeeDescriptionComponent implements OnInit
{
  description: string;

  constructor(private coffeeShopsService: CoffeeshopsService) { }

  ngOnInit()
  {
    this.coffeeShopsService.getSelectedCoffee().pipe(flatMap(id => this.coffeeShopsService.getCoffeeDescription(id))).subscribe(description => this.description = description);
  }
}
