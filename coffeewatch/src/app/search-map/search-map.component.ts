import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.css']
})

export class SearchMapComponent implements OnInit
{
  centerlat: number;
  centerlng: number;
  userlat:number= -1.0;
  userlng:number=-1.0;

  constructor() { }

  getLocation()
  {
    if (navigator.geolocation) 
    {
      navigator.geolocation.getCurrentPosition(position => 
      {
        this.userlat = position.coords.latitude;
        this.userlng = position.coords.longitude;
        this.centerlat = 0;
        this.centerlng = 0;  
        setTimeout(() => {
          this.centerlat = position.coords.latitude;
          this.centerlng = position.coords.longitude;  
        },50);  //force recenter
       

      });
    }
    else
    {
      alert("Cannot return position")
    }
  }

  ngOnInit()
  {
    this.centerlat = 37.982038;
    this.centerlng = 23.730271;
  }
}
