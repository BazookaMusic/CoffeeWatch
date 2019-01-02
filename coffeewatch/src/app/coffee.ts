import {Review} from './review'

export class Coffee
{
    id: number;
    name: string;
    iconPath: string;

    price: number;
    rating: number;
    numOfReviews: number;

    reviews: Review[];
    
    constructor(id: number, name: string, iconPath: string, price: number, rating: number, numOfReviews: number, reviews: Review[]) 
    {
        this.id = id;
        this.name = name;
        this.iconPath = iconPath;
        this.price = price;
        this.rating = rating;
        this.numOfReviews = numOfReviews;
        this.reviews = reviews;
    }
}
