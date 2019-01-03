import { Component, OnInit, Input } from '@angular/core';

import { CoffeeShop } from '../coffee-shop';

@Component({
  selector: 'app-coffee-shop-preview',
  templateUrl: './coffee-shop-preview.component.html',
  styleUrls: ['./coffee-shop-preview.component.css']
})
export class CoffeeShopPreviewComponent implements OnInit
{

  @Input() coffeeShop: CoffeeShop;

  constructor() { }

  ngOnInit()
  {
    
  }

}
