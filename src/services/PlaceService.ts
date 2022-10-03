import {Api} from "@/services/Api";
import {IPlace} from "@/interfaces/IPlace";
import Axios from "axios";
import router from "@/router";

export class PlaceService extends Api {
    public async getPlace(id: string): Promise<IPlace> {
        const token = JSON.parse(localStorage.token)
        const url = this.base_url + `/api/location/${id}`;
        try {
            const res = await Axios.get(url, {
                headers: {  'Content-type': 'application/json; charset=UTF-8',"Authorization": "Bearer "+token.token}
                //withCredentials: true
            });
            return res.data;
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

    public async getBriteLocation(id: string) {
        const token = JSON.parse(localStorage.token)
        const url = this.base_url + `/api/location/${id}`;
        try {
            const res = await Axios.get(url, {
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
                //...
            }
            return JSON.parse('');
        }

    }

    public async getGoogleLocation(id: string) {
        const token = JSON.parse(localStorage.token)
        const url = this.base_url + `/api/google/${id}`;
        try {

            const res = await Axios.get(url, {
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
                //...
            }
            return JSON.parse('');
        }


    }

    public async uploadPlaceImage(photo: File, place_id: string) {
        const token = JSON.parse(localStorage.token)
        const url = this.base_url + '/api/photo';
        const config = {headers: {'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + token.token}};
        const form_data = new FormData();
        form_data.append('image', photo);
        form_data.append('type', 'place');
        form_data.append('id', place_id);

        try {
            const res = await Axios.post(url, form_data, config);
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
                //...
            }
            return JSON.parse('');
        }

    }

    public async searchGoogleLocations(lat: number, lng: number, type: string, radius: number) {
        const token = JSON.parse(localStorage.token)
        const url = this.base_url + `/api/google/search?lat=${lat}&lng=${lng}&radius=10000&type=${type}`;
        try {
            const res = await Axios.get(url, {
                headers: {  'Content-type': 'application/json; charset=UTF-8',"Authorization": "Bearer "+token.token}
                //withCredentials: true
            });
            return res;
        } catch (e) {
            if (e.response.status === 500) {
                return e.response;
            }
            else  if (e.response.status === 401) {
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

    public async getAddressForCoordinates(lat: number, lng: number) {
        const token = JSON.parse(localStorage.token)
        const url = this.base_url + `/api/google/address?lat=${lat}&lng=${lng}`;
        try {
            const res = await Axios.get(url, {
                headers: {  'Content-type': 'application/json; charset=UTF-8',"Authorization": "Bearer "+token.token}
                //withCredentials: true
            });
            return res;
        } catch (e) {
            if (e.response.status === 500) {
                return e.response;
            }
            else  if (e.response.status === 401) {
                this.logout();
                router.push({name: 'home'});
            } else if (e.response.status === 403) {
                this.logout();
                router.push({name: 'home'});
            } else {
                //...
            }
        }


    }

    logout() {
        localStorage.removeItem('user');
    }
}
