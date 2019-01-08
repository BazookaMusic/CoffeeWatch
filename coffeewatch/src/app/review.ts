export class Review
{
    id: number;
    text: string;
    rating: number;

    userID: number;
    username: string;

    date: Date;

    numOfLikes: number;
    numOfDislikes: number;

    constructor(id: number, text: string, rating: number, userID: number, username: string, date:Date, numOfLikes: number, numOfDislikes: number) 
    {
        this.id = id;
        this.text = text;
        this.rating = rating;
        this.userID = userID;
        this.username = username;
        this.date = date;
        this.numOfLikes = numOfLikes;
        this.numOfDislikes = numOfDislikes;
    }
}
