import {Api} from "@/services/Api";
import {IFavorite} from "@/interfaces/IFavorite";
import router from "@/router";
import Axios from "axios";

export class FavoritesService extends Api {
    public async reviewers(id: string) {
        const token = JSON.parse(localStorage.token)
        const url = this.base_url + `/api/favorites?filter=reviewers&id=${id}`;
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
                //...
            }
            return JSON.parse('');
        }

    }

    public async places(id: string) {
        const token = JSON.parse(localStorage.token)
        const url = this.base_url + `/api/favorites?filter=locations&id=${id}`;
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
                //...
            }
            return JSON.parse('');
        }

    }

    public async addFavorite(user_id: string, type: string, favorite_id: string) {
        const token = JSON.parse(localStorage.token)
        const url = this.base_url + `/api/favorites`;
        try {
            const res = await Axios.post(url,
                JSON.stringify(
                    {
                        "id": user_id,
                        "type": type,
                        "favorite": favorite_id
                    }
                ),
                {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8','Authorization': 'Bearer ' + token.token,
                    }
                }
            );
            return res;
        } catch (e) {
            if (e.response.status === 401) {
                this.logout();
                router.push({name: 'home'});
            } else if (e.response.status === 403) {
                this.logout();
                router.push({name: 'home'});
            }
            else {
                return e.response;
            }
            return JSON.parse('');
        }

    }

    public async logout() {
        localStorage.removeItem('user');
    }
}
