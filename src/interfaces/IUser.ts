import {INewUser} from "@/interfaces/INewUser";
import {IPhoto} from "@/interfaces/IPhoto";

export interface IUser extends INewUser{
    paymail?: string;
    reviews_count?: number;
    location?: string;
    earnings?: number;
    reputation?: number;
    has_wallet?: boolean;
    city?: string;
    state?: string,
    profilePhoto?: IPhoto;
    wallet?: string;
    onboardingSurveyDone?: boolean;
    name?: string;
}

