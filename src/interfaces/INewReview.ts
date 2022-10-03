import {IUser} from "@/interfaces/IUser";
import {IRating} from "@/interfaces/IRating";

export interface INewReview{
    placeID: string;
    body: string;
    ratings: IRating,
    date: string;
    user: IUser;
}
