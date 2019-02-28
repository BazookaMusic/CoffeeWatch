/// <reference types="@types/googlemaps" />
import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { CoffeeshopsService } from '../coffeeshops.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CoffeeShop } from '../coffee-shop';

@Component({
  selector: 'app-new-coffeeshop',
  templateUrl: './new-coffeeshop.component.html',
  styleUrls: ['./new-coffeeshop.component.css']
})
export class NewCoffeeshopComponent implements OnInit
{
  centerlat: number;
  centerlng: number;
  zoomLevel: number;
  shoplat: number;
  shoplng: number;
  public addressControl: FormControl;

  coffeeShop: CoffeeShop;

  newCoffeeShopTitle = "Προσθήκη νέας καφετέριας";
  editCoffeeShopTitle = "Τροποποίηση καφετέριας";
  title: String;

  coffeeShopForm: FormGroup;

  autocomplete: google.maps.places.Autocomplete;

  @ViewChild("name")
  public nameElementRef: ElementRef;
  
  @ViewChild("address")
  public addressElementRef: ElementRef;

  @ViewChild("telephone")
  public telephoneElementRef: ElementRef;

  @ViewChild("website")
  public websiteElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private coffeeShopsService: CoffeeshopsService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.shoplat = undefined;
    this.shoplng = undefined;
    this.zoomLevel = 13;
    this.centerlat = 37.982038;
    this.centerlng = 23.730271;

    this.coffeeShopForm = this.fb.group({
      'name': ['', [Validators.required, Validators.maxLength(100)]],
      'telephone': ['', [Validators.required, Validators.maxLength(20)]],
      'website': ['', [Validators.required, Validators.maxLength(100)]]
    });

    this.loadAutocomplete();

    if (this.router.url === '/newCoffeeShop')
    {
      this.title = this.newCoffeeShopTitle;

      this.nameElementRef.nativeElement.value = "";
      this.addressElementRef.nativeElement.value = "";
      this.telephoneElementRef.nativeElement.value = "";
      this.websiteElementRef.nativeElement.value = "";
    }
    else
    {
      this.title = this.editCoffeeShopTitle;

      this.getCoffeeShop();
    }
  }

  loadAutocomplete() {
    this.addressControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.addressElementRef.nativeElement, {});

      this.autocomplete.addListener("place_changed", () => this.getPlace());
    });
  }

  getCoffeeShop(): void
  {
    const id = +this.route.snapshot.paramMap.get('coffeeShopID');
    console.log(id);
    this.coffeeShopsService.getCoffeeShop(id).subscribe(cs => 
    {
      this.coffeeShop = cs;

      this.nameElementRef.nativeElement.value = this.coffeeShop.name;
      this.addressElementRef.nativeElement.value = this.coffeeShop.address;
      this.telephoneElementRef.nativeElement.value = this.coffeeShop.telephone;
      this.websiteElementRef.nativeElement.value = this.coffeeShop.website;
    });
  }

  getPlace()
  {
    this.ngZone.run(() => {
      //get the place result
      let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

      //verify result
      if (place.geometry === undefined || place.geometry === null) return;

      //set latitude, longitude and zoom
      this.shoplat = place.geometry.location.lat();
      this.shoplng = place.geometry.location.lng();

      this.centerMap(this.shoplat, this.shoplng);
    });
  }

  centerMap(lat: number, lng: number) {
    this.centerlat = lat;
    this.centerlng = lng;
    setTimeout(() => {
      this.centerlat = lat;
      this.centerlng = lng;
    }, 50);
  }

  cancel()
  {
    const prevURL = this.userService.getPrevUrl();
    if(prevURL != undefined)
    {
      this.router.navigateByUrl(prevURL);
    }
    else
    {
      this.router.navigate(["/home"]);
    }
  }
}
