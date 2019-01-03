/// <reference types="@types/googlemaps" />
import { Component,ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {FormsModule, ReactiveFormsModule,FormControl} from '@angular/forms';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.css']
})

export class SearchMapComponent implements OnInit
{
  centerlat: number;
  centerlng: number;
  zoom:number;
  public searchControl: FormControl;
  userlat:number = -1.0;
  userlng:number = -1.0;

  autocomplete: google.maps.places.Autocomplete;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
    ) { }

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
          this.centerlat = this.userlat;
          this.centerlng = this.userlng;
        }, 50);
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

    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {});

      this.autocomplete.addListener("place_changed", () => 
      {
        this.getPlace();
      });
    });
  }

  getPlace()
  {
    this.ngZone.run(() => {
      //get the place result
      let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

      //verify result
      if (place.geometry === undefined || place.geometry === null) {
        return;
      }

      //set latitude, longitude and zoom
      this.userlat = place.geometry.location.lat();
      this.userlng = place.geometry.location.lng();
      setTimeout(() => {
        this.centerlat = this.userlat;
        this.centerlng = this.userlng;
      }, 50);
      this.zoom = 13;
    });
  }
}
