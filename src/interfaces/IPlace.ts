import {IGooglePlace} from "@/interfaces/IGooglePlace";
import {IPhoto} from "@/interfaces/IPhoto";

interface IPlaceSchedule{
    day: string,
    opens: boolean,
    from?: string,
    until?: string,
    is_today?: boolean,
}
export interface IPlace extends IGooglePlace{
    description: string,
    category: string,
    britevue_ratings: {
        quality: number,
        experience: number,
        value: number,
        average: number,
    }
    review_total: number,
    schedule?: IPlaceSchedule[],
    features?: {
        dine_in: boolean,
        takeaway: boolean,
        no_contact_delivery: boolean,
    }
    britevue_photos?: IPhoto[];
}
