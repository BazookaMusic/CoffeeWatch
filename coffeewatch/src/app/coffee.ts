import {Review} from './review';
export const coffeeCategories = [
    'Espresso', 'Freddo espresso', 'Cappuccino', 'Freddo cappuccino',
    'Latte', 'Nes', 'Frappe', 'Φίλτρου', 'Ελληνικός'];
export class Coffee {
    id: number;
    category: string;
    tags: string[];
    name: string;
    iconPath: string;

    description: string;

    price: number;

    extraData: {
        rating: number,
        numOfReviews: number,
    };

    reviews: Review[];

    constructor(id: number, name: string, description: string,
         iconPath: string, price: number, rating: number, numOfReviews: number, reviews: Review[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.extraData.rating = rating;
        this.extraData.numOfReviews = numOfReviews;
        this.reviews = reviews;
    }
}
