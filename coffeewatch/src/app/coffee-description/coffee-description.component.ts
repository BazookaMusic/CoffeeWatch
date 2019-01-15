import { Component, OnInit } from '@angular/core';
import { Coffee } from '../coffee';
import { CoffeeshopsService } from '../coffeeshops.service';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-coffee-description',
  templateUrl: './coffee-description.component.html',
  styleUrls: ['./coffee-description.component.css']
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
