import { Component, OnInit } from '@angular/core';
import { CoffeeshopsService } from '../coffeeshops.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private coffeeShopsService: CoffeeshopsService) { }
  picker_on = true;

  ngOnInit() {
    this.coffeeShopsService.getCoffeeShops().subscribe(cs =>
      {
        if (cs !== undefined)
        {
          this.picker_on = false;
        }
        else
        {
          this.picker_on = true;
        }
      })

  }

}
