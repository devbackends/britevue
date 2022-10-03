import {Api} from "@/services/Api";
import Axios from "axios";
import {ISurvey} from "@/interfaces/ISurvey";
import {json} from "@rxweb/reactive-forms";
import router from "@/router"

export class SurveyService extends Api{
    logout() {
        localStorage.removeItem('user');
    }
    /**
     * Gets the user.
     *
     * @param id
     */
    public async getSurvey(id: string): Promise<ISurvey>{
        const token = JSON.parse(localStorage.token)
        const url = this.base_url + '/api/survey/' + id;
        let err = null;
        const res = await Axios.get(url, {
            headers: {"Authorization": "Bearer "+token.token}
            //withCredentials: true
        }).catch(e => err = e);
        if(err){
            throw err;
        }
        return res.data;
    }

    /**
     * Submit survey response.
     *
     * @param survey
     */
    public async postSurvey(survey: ISurvey): Promise<any>{
        const token = JSON.parse(localStorage.token)
        const url = this.base_url + "/api/survey";
        try {
          const res = await Axios.post(url,
            survey,
            {
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer '+token.token,
              },
              withCredentials: true,
            }
          )
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
            }
            return JSON.parse('');
        }
    }
}
