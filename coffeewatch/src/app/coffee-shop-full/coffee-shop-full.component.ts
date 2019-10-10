import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { CoffeeShop } from '../coffee-shop';
import { CoffeeshopsService, average } from '../coffeeshops.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from '../user.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Coffee } from '../coffee';

@Component({
  selector: 'app-coffee-shop-full',
  templateUrl: './coffee-shop-full.component.html',
  styleUrls: ['./coffee-shop-full.component.css'],
  animations: [
    trigger('fastFade', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(400)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(400, style({opacity: 0})))
    ]),
  ]
})

export class CoffeeShopFullComponent implements OnInit {
  coffeeShop: CoffeeShop;
  clickedCoffees: boolean[] = [];
  selectedCoffee: number;
  activeTab: string;

  constructor(
    private route: ActivatedRoute,
    private coffeeShopsService: CoffeeshopsService,
    private location: Location,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activeTab = 'description';

    this.getCoffeeShop();

    this.coffeeShopsService.shopChange$.subscribe(changed =>
      {
        if (changed)
        {
          this.getCoffeeShop();
        }
      })

    this.coffeeShopsService.priceChange$.subscribe(changed => {
      if (changed) {
        this.coffeeShopsService.updateCoffeeShopPrices(this.coffeeShop);
          this.coffeeShopsService.getLastPrice(this.coffeeShop.coffees[this.selectedCoffee].id).subscribe(price => {
            if (price !== undefined) {
              this.coffeeShop.coffees[this.selectedCoffee].price = price.price;
             }
          });
      }
    });

    this.coffeeShopsService.reviewChange$.subscribe(id_changed =>
      {
        if (id_changed !== undefined)
        {
          if (id_changed === this.coffeeShop.coffees[this.selectedCoffee].id)
          {
            this.updateReviews(this.coffeeShop.coffees[this.selectedCoffee]);
          }
          else
          {
            for (let coffee of this.coffeeShop.coffees)
            {
              if (coffee.id === id_changed)
              {
                this.updateReviews(coffee);
              }
            }
          }
        }
      })
  }

  refresh()
  {
    this.coffeeShopsService.updateCoffeeShopPrices(this.coffeeShop);
    this.coffeeShop.coffees.forEach(coffee => this.updateReviews(coffee));
  }
  updateReviews(coffee: Coffee)
  {
    this.coffeeShopsService.getCoffeeReviews(coffee.id).
        subscribe(reviews =>
          {
            coffee.extraData.rating = +average(reviews.map(review => review.rating)).toFixed(2);
            coffee.extraData.numOfReviews = reviews.length;
          });
  }

  reset() {
    let i = 0;
    for (; i < this.coffeeShop.coffees.length; i++) {
      this.clickedCoffees[i] = false;
    }

    this.selectedCoffee = undefined;
  }

  tabClicked(tab: string): void {
    this.activeTab = tab;
  }

  getCoffeeShop(): void {
    const id = +this.route.snapshot.paramMap.get('coffeeShopID');

    this.coffeeShopsService.getCoffeeShop(id).subscribe( cs => {
        this.coffeeShop = cs;
        this.refresh();
        this.reset();
      });
  }

  goBack(): void {
    this.location.back();
  }

  editCoffeeShop(selectedCoffeeShopID: number) {
    if (this.userService.isloggedIN()) {
      this.router.navigate(['/editCoffeeShop/' + selectedCoffeeShopID]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  deleteCoffee(selectedCoffee: number) {
    if (this.userService.isloggedIN()) {
      if (confirm('Είσαι σίγουρος ότι θέλεις να διαγράψεις τον καφέ;')) {

        this.coffeeShopsService
        .deleteCoffee(this.coffeeShop.coffees[this.selectedCoffee].id)
        .subscribe(res =>
          {
            this.coffeeShopsService.coffeeShopNeedsRefresh();
          });

      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  onClick(coffeeIndex: number) {
    if (this.clickedCoffees[coffeeIndex]) {
      this.clickedCoffees[coffeeIndex] = false;
      this.selectedCoffee = undefined;

      this.coffeeShopsService.selectCoffee(undefined);
    } else {
      if (this.selectedCoffee !== undefined) {
        this.clickedCoffees[this.selectedCoffee] = false;
      }

      this.clickedCoffees[coffeeIndex] = true;
      this.selectedCoffee = coffeeIndex;

      this.coffeeShopsService.selectCoffee(this.coffeeShop.coffees[this.selectedCoffee].id);
    }
  }
}
