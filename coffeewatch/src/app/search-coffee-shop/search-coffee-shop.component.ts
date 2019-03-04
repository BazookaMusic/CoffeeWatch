import { Component, OnInit } from '@angular/core';
import { CoffeeshopsService } from '../coffeeshops.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CoffeeShop } from '../coffee-shop';
import { transition, trigger, state, animate, style } from '@angular/animations';

@Component({
  selector: 'app-search-coffee-shop',
  templateUrl: './search-coffee-shop.component.html',
  styleUrls: ['./search-coffee-shop.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({ opacity: 0 })))
    ]),
    trigger('fastFade', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({ opacity: 0 })))
    ]),
  ]
})

export class SearchCoffeeShopComponent implements OnInit
{
  searchGroup: FormGroup;
  coffeeShops: CoffeeShop[];
  filteredCoffeeShops: CoffeeShop[] = [];
  selectedCoffeeShop: number;

  constructor(private coffeeShopsService: CoffeeshopsService) { }

  ngOnInit()
  {
    this.searchGroup = new FormGroup({
      searchCoffeeShops: new FormControl('', [Validators.minLength(0)])
    });

    this.searchGroup.controls.searchCoffeeShops.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.filteredCoffeeShops = this.coffeeShops;
      }
      else
      {
        this.filteredCoffeeShops = this.coffeeShops.filter(cs => cs.name.toLowerCase().startsWith(value.toLowerCase()));
      }
    });
  }

  getCoffeeShops()
  {
    this.coffeeShopsService.getCoffeeShops().subscribe(coffeeShopsItem => {
      if (coffeeShopsItem !== undefined) {
        this.coffeeShops = coffeeShopsItem;

        if (this.filteredCoffeeShops.length === 0) {
          this.filteredCoffeeShops = this.coffeeShops.slice(0, this.coffeeShops.length);
        }
        this.refresh();
      }
    });
  }

  refresh()
  {
    this.coffeeShopsService.selectCoffeeShop(undefined);
    this.searchGroup.controls.searchCoffeeShops.setValue('');
  }

  onClickCoffeeShop(coffeeShopID: number) {
    if (this.selectedCoffeeShop !== undefined && coffeeShopID === this.selectedCoffeeShop) {
      this.coffeeShopsService.selectCoffeeShop(undefined);
    } else {
      this.coffeeShopsService.selectCoffeeShop(coffeeShopID);
    }
  }

  trackByFn(index: number, item: CoffeeShop): number {
    return item.id;
  }
}
