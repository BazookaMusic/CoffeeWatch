import { Component, OnInit, Input } from '@angular/core';

import { CoffeeShop } from '../coffee-shop';

@Component({
  selector: 'app-coffee-shop-full',
  templateUrl: './coffee-shop-full.component.html',
  styleUrls: ['./coffee-shop-full.component.css']
})
export class CoffeeShopFullComponent implements OnInit
{

  @Input() coffeeShop: CoffeeShop;

  constructor() { }

  ngOnInit()
  {
    
  }

}
