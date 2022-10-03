import {Api} from "@/services/Api";
import Axios from "axios";
import router from "@/router";


export class NotificationsService extends Api {

    public async getUserNotifications(){
      if (localStorage.token == null) {
        throw 'no token found'
      }
        const token = JSON.parse(localStorage.token)
        const url = this.base_url + `/api/notifications`;
        try {
            const res = await Axios.get(url, {
                headers: {  'Content-type': 'application/json; charset=UTF-8',"Authorization": "Bearer "+token.token}
                //withCredentials: true
            });
            return res;
        } catch (e) {
            if (e.response.status === 401) {
                this.logout();
                router.push({name: 'home'});
            } else if (e.response.status === 403) {
                this.logout();
                router.push({name: 'home'});
            } else {
              return e.response
                //...
            }
        }
    }
    public async clearUserNotifications(){
        const token = JSON.parse(localStorage.token)
        const url = this.base_url + `/api/notifications/clear`;
        try {
            const res = await Axios.post(url,'',{
                headers: {  'Content-type': 'application/json; charset=UTF-8',"Authorization": "Bearer "+token.token}
                //withCredentials: true
            });
            return res;
        } catch (e) {
            if (e.response.status === 500) {
                return e.response;
            }
            else if (e.response.status === 401) {
                this.logout();
                router.push({name: 'home'});
            } else if (e.response.status === 403) {
                this.logout();
                router.push({name: 'home'});
            } else {
              return e.response
            }
        }
    }
    logout() {
        localStorage.removeItem('user');
    }

}
