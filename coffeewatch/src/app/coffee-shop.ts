import {Coffee} from './coffee'
 
export class CoffeeShop 
{
    id: number;
    name: string;
    iconPath: string;
    address: string;
    website: string;
    telephone: string;

    coffees: Coffee[];

    constructor(id: number, name: string, iconPath: string, address: string, website: string, telephone: string, coffees: Coffee[])
    {
        this.id = id;
        this.name = name;
        this.iconPath = iconPath;
        this.address = address;
        this.website = website;
        this.telephone = telephone;
        this.coffees = coffees;
    }
}
