import {Api} from "@/services/Api";
import {IUser} from "@/interfaces/IUser";
import Axios from "axios";
import {INewUser} from "@/interfaces/INewUser";
import {json} from "@rxweb/reactive-forms";
import router from '@/router';

export class UserService extends Api {
    /**
     * Gets the user.
     *
     * @param id
     */
    public async getUser(id: string){
      if (localStorage.token == null) {
        throw 'no token found'
      }
        const token = JSON.parse(localStorage.token)
        const url = this.base_url + '/api/user/' + id;

        try {
            const res = await Axios.get(url, {
                headers: {"Authorization": "Bearer " + token.token}
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

    /**
     * Gets the user.
     *
     * @param user
     */
    public async signup(user: INewUser): Promise<IUser> {
        const url = this.base_url + "/user";
        try {
            const res = await Axios.post(url,
            JSON.stringify(user),
                {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                }
            );
            return res.data;
        } catch (e) {
            if (e.response.status === 401) {
                this.logout();
                router.push({name: 'home'});
            } else if (e.response.status === 403) {
                this.logout();
                router.push({name: 'home'});
            } else if (e.response.status === 409) {
                throw e
            }
            return JSON.parse('{"error": "failed to signup"}');
        }

    }

    /**
     * Logs in the user.
     *
     * @param username
     * @param password
     */
    public async login(username: string, password: string): Promise<IUser> {

        const url = this.base_url + '/login';
        try {
            const res = await Axios.post(
                url,
                {
                    username: username,
                    password: password
                }
                /*{
                  withCredentials: true
                }*/
            );
            const token = res.data
            localStorage.setItem('token', JSON.stringify(token));
            const user = this.updateUserLocalStorage(username)
            return user;
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
            return JSON.parse('{}')
        }


    }

    public async updateUserLocalStorage(username: string) {
        if (username == "") {
            let userProfile: any = localStorage.getItem('user');
            if (userProfile) {
                userProfile = JSON.parse(userProfile)
                username = userProfile.id
            }
        }
        if (username) {
            const user = await this.getUser(username);
           if(user.status==200){
               localStorage.setItem('user', JSON.stringify(user.data));
               return user.data
           }

        }
        return JSON.parse('{ "status":"error", "message":"Token Expired"}');

    }

    public async logout() {
        localStorage.removeItem('user');
    }

    public getCurrentUser(): IUser | null {
        let user: any = localStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            if (!user.reviews_count) {
                user.reviews_count = 0;
            }
            if (!user.earns) {
                user.earns = 0;
            }
            if (!user.city) {
                user.city = "";
            }
            if (!user.state) {
                user.state = "";
            }
        }
        return user;
    }

    public isLoggedIn(): boolean {
        const user = this.getCurrentUser();
        return user !== null;
    }

    public async uploadUserPhoto(photo: File, username: string): Promise<IUser> {

        const token = JSON.parse(localStorage.token)
        const url = this.base_url + '/api/photo';
        let err = null;
        const config = {headers: {'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + token.token}};
        const form_data = new FormData();
        form_data.append('image', photo);
        form_data.append('type', 'user');
        form_data.append('id', username);
        try {
            const res = await Axios.post(url, form_data, config).catch(e => err = e);
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
    public async updateProfile(user: IUser){

        const url = this.base_url + '/api/user';
        const token = JSON.parse(localStorage.token)
        try {
            const res = await Axios.put(
                url,
                JSON.stringify(user),
                {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer ' + token.token
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
                //...
            }
            return JSON.parse('{}');
        }
    }

}
