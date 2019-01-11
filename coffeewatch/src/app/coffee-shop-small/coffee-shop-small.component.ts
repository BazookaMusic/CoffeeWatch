import { Component, OnInit, Input } from '@angular/core';

import { CoffeeShop } from '../coffee-shop';

@Component({
  selector: 'app-coffee-shop-small',
  templateUrl: './coffee-shop-small.component.html',
  styleUrls: ['./coffee-shop-small.component.css']
})
export class CoffeeShopSmallComponent implements OnInit
{

  @Input() coffeeShop: CoffeeShop;

  constructor() { }

  ngOnInit()
  {
    
  }

}
