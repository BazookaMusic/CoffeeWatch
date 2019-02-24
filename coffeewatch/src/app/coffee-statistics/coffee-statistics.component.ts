import { Component, OnInit } from '@angular/core';
import { CoffeeshopsService, average } from '../coffeeshops.service';
import { flatMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Price } from '../price';

@Component({
  selector: 'app-coffee-statistics',
  templateUrl: './coffee-statistics.component.html',
  styleUrls: ['./coffee-statistics.component.css']
})
export class CoffeeStatisticsComponent implements OnInit {
  currentCoffeeShopId: number;
  price_data: any[];
  constructor(private coffeeShopsService: CoffeeshopsService,
    private route: ActivatedRoute) { }


  
  public history;
  avg: number;
  lowest: number;
  highest: number;
  emptyHistory: boolean;

  options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};




  view: any[] = [700, 400];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Ημερομηνία';
  showYAxisLabel = true;
  yAxisLabel = 'Τιμή (€)';
  timeline = true;

  colorScheme = {
     domain: ['#c62828', '##c62828', '#C7B42C', '#AAAAAA']
  };

    // line, area
  autoScale = true;


  dateTickFormatting(val: any) : string{
    if (val instanceof Date) {
      return (<Date>val).toLocaleDateString();
    }
  }



  ngOnInit() {
    this.currentCoffeeShopId = +this.route.parent.snapshot.paramMap.get('coffeeShopID');

    this.coffeeShopsService.getSelectedCoffee()
    .pipe(flatMap(id => {
      if (id !== undefined) {
       return this.coffeeShopsService.getPrices({productId: id, shopId: this.currentCoffeeShopId});
      } else {
        return of(undefined);
      }
    }))
    .subscribe(prices => {
        if (prices !== undefined && prices.length !== 0) {
          this.emptyHistory = false;
          const actual_prices = prices.map(price => price.price);
          this.history = chartData(prices);
          this.avg = average(prices.map(price => price.price));
          this.highest = Math.max(...actual_prices);
          this.lowest = Math.min(...actual_prices);
        }
        else
        {
          this.emptyHistory = true;
        }
      });



  }
}

function chartData(prices: Price[]) {
  const priceData = [];
  const data =  prices.forEach(price => {

    priceData.push( {'name': price.date,
            'value': +price.price});
    });


  return [
    {
      name: 'Τιμή',
      series: priceData,
    }
  ];
}




