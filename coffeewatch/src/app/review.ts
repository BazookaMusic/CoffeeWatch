export class Review
{
    id: number;
    text: string;
    rating: number;

    userID: number;

    numOfLikes: number;
    numOfDislikes: number;

    constructor(id: number, text: string, rating: number, userID: number, numOfLikes: number, numOfDislikes: number) 
    {
        this.id = id;
        this.text = text;
        this.rating = rating;
        this.userID = userID;
        this.numOfLikes = numOfLikes;
        this.numOfDislikes = numOfDislikes;
    }
}
