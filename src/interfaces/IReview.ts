import {IUser} from "@/interfaces/IUser";
import {INewReview} from "@/interfaces/INewReview";

export interface IReview extends INewReview{
    id: number;
    title: string;
    rating: string,
    downvotes: number;
    upvotes: number;
    score: number;
}
