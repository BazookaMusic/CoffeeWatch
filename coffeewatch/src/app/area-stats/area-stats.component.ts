import { Component, OnInit } from '@angular/core';
import { CoffeeshopsService } from '../coffeeshops.service';

@Component({
  selector: 'app-area-stats',
  templateUrl: './area-stats.component.html',
  styleUrls: ['./area-stats.component.css']
})
export class AreaStatsComponent implements OnInit {

  constructor(private coffeeShopsService: CoffeeshopsService) { }

  ngOnInit() {
  }

}
