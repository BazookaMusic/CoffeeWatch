export interface priceData {
    date: string;
    price: number;
    shopId: number;
    shopName: string;

    productId: number;
    productName: string;
}

export interface priceSearch {
    productId: number;
    shopId: number;
}

export class Price {
    date: Date;
    price: number;
    shopId: number;
    shopName: string;

    productId: number;
    productName: string;

    toPrice(a: priceData) {
        const parts =  a.date.split('-');
        this.date = new Date(+parts[0], +parts[1] - 1, +parts[2]);
        this.price = +a.price;
        this.shopId = +a.shopId;
        this.shopName = this.shopName;
        this.productId = +a.productId;
        this.productName = a.productName;
        return this;
    }
}

export function toPrice(a: priceData) {
    const newPrice = new Price();
    const parts =  a.date.split('-');
    newPrice.date = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    newPrice.price = +a.price;
    newPrice.shopId = +a.shopId;
    newPrice.shopName = a.shopName;
    newPrice.productId = +a.productId;
    newPrice.productName = a.productName;
    return newPrice;
}
