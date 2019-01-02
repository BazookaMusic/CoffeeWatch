import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.css']
})

export class SearchMapComponent implements OnInit
{
  lat: number;
  lng: number;

  constructor() { }

  getLocation()
  {
    if (navigator.geolocation) 
    {
      navigator.geolocation.getCurrentPosition(position => 
      {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
    else
    {
      alert("Cannot return position")
    }
  }

  ngOnInit()
  {
    this.lat = 37.982038;
    this.lng = 23.730271;
  }
}
