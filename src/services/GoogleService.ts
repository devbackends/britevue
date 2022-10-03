import {Api} from "@/services/Api";
import {IGooglePlace} from "@/interfaces/IGooglePlace";
//import {IPlace} from "@/interfaces/IPlace";
import Axios from "axios"
import router from "@/router";

export class GoogleService extends Api{

    public async getPlace(id: string): Promise<IGooglePlace>{
      const token = JSON.parse(localStorage.token)
      const url = this.base_url + '/api/google/' + id;
    try{
        const res = await Axios.get(url, {
            headers: {"Authorization": "Bearer "+token.token}
        });
        return res.data;
    }catch(e){
        if(e.response.status === 401) {
            this.logout();
            router.push({name: 'home'});
        }else if(e.response.status === 403) {
            this.logout();
            router.push({name: 'home'});
        }else{
            //...
        }
        return JSON.parse('') ;
    }

    }
    /*public convertToIPlace(gPlace: IGooglePlace): IPlace|null {
      const place = {
        id: gPlace.id,
        title: gPlace.name,
        description: "",
        category: "",
        reviews_count: 0,
        rating_details: {
          quality: 0,
          experience: 0,
          value: 0,
        },
        rating: 0,
        state: "",
        address: gPlace.formatted_address,
        website: {
          title: gPlace.website,
          link: gPlace.website,
        },
        phone: gPlace.formatted_phone_number,
        coordinates: {
          lat: gPlace.geometry.location.lat,
          long: gPlace.geometry.location.lng,
        },
      }
      return place
    }*/
    public async logout(){
        localStorage.removeItem('user');
    }
}
