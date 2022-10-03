import {Api} from "@/services/Api";
import {IReview} from "@/interfaces/IReview";
import {IUser} from "@/interfaces/IUser";
import {IRating} from "@/interfaces/IRating";
import Axios from "axios";
import router from "@/router";


export class ReviewsService extends Api {
    public async allUserReviews(id: string){
        const token = JSON.parse(localStorage.token)
        const url = this.base_url + `/api/reviews?filter=user&id=${id}`;
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
            }
        }

    }

    public async getReview(review_id: string) {
        const token = JSON.parse(localStorage.token)
        const url = this.base_url + `/api/review/${review_id}`;
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

    public async createReview(user: IUser, place_id: string, review_body: string, stars: any,imageHashes?: any, review_paywall?: number){
        const url = this.base_url + `/api/review`;
        const token = JSON.parse(localStorage.token)
        try {
            const res = await Axios.post(url,
                JSON.stringify({
                    "user": user.id,
                    "placeId": place_id,
                    "reviewBody": review_body,
                    "photos": imageHashes,
                    "ratings": {
                        "quality": stars.quality.rate,
                        "experience": stars.experience.rate,
                        "value": stars.value.rate
                    },
                    "paywall": {
                        "cost": review_paywall
                    }
                }),
                {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8','Authorization': `Bearer ${token.token}`
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
            } else {
              return e.response
            }
        }
    }
    public async sendTip(value: any,userId: any,reviewId: any){
        const url = this.base_url + `/api/tip`;
        const token = JSON.parse(localStorage.token)
        try {
            const res = await Axios.post(url,
                JSON.stringify({
                    "tipUser": userId,
                    "amount": value,
                    "reviewTx": reviewId
                }
                ),
                {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8','Authorization': `Bearer ${token.token}`
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
            }else if (e.response.status === 500) {
                return e.response;
            }
            else {
                return e.response;
            }
        }
    }

    public async editReview(review_id: string, latestTx: string, user: IUser, place_id: string, review_body: string, stars: any, imageHashes?: any, review_paywall?: number) {
        const url = this.base_url + `/api/review`;
        const token = JSON.parse(localStorage.token)
        try {

            const res = await Axios.put(url,
                JSON.stringify({
                    "id": review_id,
                    "latestTx": latestTx,
                    "user": user.id,
                    "placeId": place_id,
                    "reviewBody": review_body,
                    "photos": imageHashes,
                    "ratings": {
                        "quality": stars.quality.rate,
                        "experience": stars.experience.rate,
                        "value": stars.value.rate
                    },
                    "paywall": {
                        "cost": review_paywall
                    }
                }),
                {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8','Authorization': `Bearer ${token.token}`
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
            } else {
              return e.response
            }
        }

    }

    public async getPlaceReviews(place_id: string) {
        const url = this.base_url + `/api/reviews?filter=place&id=` + place_id;
        const token = JSON.parse(localStorage.token);
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
            }
        }

    }

    public async upvoteReview(user_name: string, review_id: string) {
        const url = this.base_url + `/api/upvote`;
        const token = JSON.parse(localStorage.token);
        try {
            const res = await Axios.post(url,
                JSON.stringify({
                    "username": user_name,
                    "reviewId": review_id
                }),
                {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8','Authorization': `Bearer ${token.token}`
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
            } else {
              return e.response
            }
        }
    }

    public async downReview(user_name: string, review_id: string) {
        const url = this.base_url + `/api/downvote`;
        const token = JSON.parse(localStorage.token);
        try {
            const res = await Axios.post(url,
                JSON.stringify({
                    "username": user_name,
                    "reviewId": review_id
                }),
                {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8','Authorization': `Bearer ${token.token}`
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
            } else {
              return e.response
            }
        }

    }

    public async deleteReview(review_id: string) {
        const url = this.base_url + `/api/review/` + review_id;
        const token = JSON.parse(localStorage.token)
        try {
            const res = await Axios.delete(url, {
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
            }
        }

    }

    public async buyReview(review_id: string) {
        const url = this.base_url + `/api/review/` + review_id +'/purchase';
        const token = JSON.parse(localStorage.token)
        console.log(token)
        try {
            const res = await Axios.post(url, {}, {
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
            }
        }

    }
    public async getRecentActivities() {
        const url = this.base_url + `/recents`;
        try {
            const res = await Axios.get(url, {
                headers: {  'Content-type': 'application/json; charset=UTF-8'}
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
              return e.response
            }
        }

    }

    logout() {
        localStorage.removeItem('user');
    }

}
