import {IUser} from "@/interfaces/IUser";
import {INotification} from "@/interfaces/INotification";
import Axios from "axios";

const BV_API_HOST = process.env.VUE_APP_BV_API_HOST

export class Api{

    base_url = BV_API_HOST

    currentUser: IUser|null = null;

    public async notifications(id: string){
        const url = this.base_url + `/user/${id}/notifications`;
        const res = await Axios.get(url, {
            headers: {  'Content-type': 'application/json; charset=UTF-8'}
            //withCredentials: true
        });
        return res;
    }
}
