import {Coffee} from './coffee';
export interface api_coffeeShop {
    id: number;
    name: string;
    iconPath: string;
    address: string;
    website: string;
    telephone: string;
    lat: number;
    lng: number;
    withdrawn: boolean;
}
export class CoffeeShop {
    id: number;
    name: string;
    iconPath: string;
    address: string;
    website: string;
    telephone: string;
    lat: number;
    lng: number;
    withdrawn: boolean;

    coffees: Coffee[];

    constructor(id: number, name: string, iconPath: string,
         address: string, website: string, telephone: string,
         lat: number, lng: number, coffees: Coffee[]) {
        this.id = id;
        this.name = name;
        this.iconPath = iconPath;
        this.address = address;
        this.website = website;
        this.telephone = telephone;
        this.coffees = coffees;
        this.lat = lat;
        this.lng = lng;
        this.withdrawn = false;
    }
}
