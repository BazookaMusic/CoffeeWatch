import { Component, OnInit, Input } from '@angular/core';
import { CoffeeShop } from '../coffee-shop';

@Component({
  selector: 'app-coffee-shop-tiny',
  templateUrl: './coffee-shop-tiny.component.html',
  styleUrls: ['./coffee-shop-tiny.component.css']
})
export class CoffeeShopTinyComponent implements OnInit {

  @Input() coffeeShop: CoffeeShop;

  constructor() { }

  ngOnInit() {
  }

}
