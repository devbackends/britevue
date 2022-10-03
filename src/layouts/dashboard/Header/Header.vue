<template>
  <div class="dashboard-header" :class="openedMenu ? 'header__toggle-opened' : ''">
    <b-navbar sticky toggleable="lg" type="light" variant="light">
      <b-navbar-brand @click="goHome" href="javascript:;">
        <img src="@/assets/images/logo_black.svg" alt="">
      </b-navbar-brand>
      <button v-on:click="writeReview()" type="button" class="btn btn-outline-primary header__write-review-button-home">Write a Review</button>
      <b-navbar-toggle target="nav-collapse" class="btn btn-link ml-auto header__toggle" @click="openMenu">
        <font-awesome-icon :icon="['fal', 'bars']" />
      </b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <li class="mr-lg-5">
          <div class="form-inline search-place-form search-place-form-header mb-3 mb-md-0">
            <div class="row no-gutters" :class="!showSearchBar ?'d-none': ''">
              <div class="col">
                  <div class="form-inline search-place-form">
                    <div class="row no-gutters w-100">
                      <div class="col search-place-form__input">
                        <div class="input-group">
                          <vue-google-autocomplete

                              id="searchBar"
                              class="form-control"
                              placeholder="Find a place..."
                              v-bind:enable-geolocation="true"
                              types="establishment"
                              v-on:placechanged="findPlaceChanged"
                              v-on:blur="showTooltip"
                              v-on:focus="hideTooltip"
                          >
                          </vue-google-autocomplete>
                        </div>
                      </div>
                      <div class="col-auto search-place-form__button">
                        <button
                          class="btn btn-transparent header-search__button" type="button">
                          <font-awesome-icon :icon="['far', 'search']" />
                        </button>
                      </div>
                    </div>
                  </div>

                <!--<input type="text" class="form-control" placeholder="places...">-->
                
              </div>
            </div>
          </div>
          </li>
          <b-nav-item class="mb-3 mb-md-0">
            <button  :class="!showSearchBar ?'d-none': ''" v-on:click="getRoutePath('dashboard')" type="button" class="btn btn-outline-primary header__write-review-button">Write a Review</button>
          </b-nav-item>
          <b-nav-item-dropdown right class="notifications-nav" v-show="user" no-caret>
            <template #button-content>
              <div class="notification-icon"   v-if="notifications.length > 0">
                <img src="@/assets/images/bell.svg" alt="Title">
                <span class="notification-count" v-if="notifications.length > 0" v-text="notifications.length"></span>
              </div>
            </template>
            <b-dropdown-item v-for="(notification,index) in notifications" :key="index" href="javascript:;">
              <span v-text="notification"></span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right class="profile-nav" v-if="user">
            <template #button-content>
              <b class="username">{{ user.firstName + " " + user.lastName }}</b>
              <div v-if="user.profilePhoto.url == ''" class="profile-photo">
                <img src="@/assets/images/person.png" alt="">
              </div>
              <div v-else class="profile-photo">
                <img :src="user.profilePhoto.url" :alt="user.firstName">
              </div>
              <div class="caret">
                <font-awesome-icon :icon="['far', 'chevron-down']" />
              </div>
            </template>
            <b-dropdown-item v-on:click="getRoutePath('profile',{'id':user.id})" href="javascript:;" class="profile-link">
              <img class="icon" src="@/assets/images/person_icon.svg" alt="Person">My Profile
            </b-dropdown-item>
            <div class="divider"></div>
            <b-dropdown-item href="javascript:;" class="logout-link" @click="logout">Log out</b-dropdown-item>
          </b-nav-item-dropdown>
          <button type="button" class="btn btn-outline-primary" id="header-signup-button" @click="openSignup()" v-show="!user">Sign up</button>
          <button type="button" @click="openLogin()" class="btn btn-primary ml-3" v-show="!user">Login</button>
          <!-- <button ref="logout" class="btn btn-outline-primary " @click="logout" v-show="user">Logout</button> -->
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>
    <Login ref="login" @onLogin="onLogin" @openSignup="openSignup"></Login>
    <signup ref="signup" @onSignup="onSignup"></signup>
  </div>
</template>

<style lang="scss" src="./Header.scss"/>
<script lang="ts">
import {Vue, Component, Inject} from 'vue-property-decorator';
import {UserService} from "@/services/UserService";
import {IUser} from "@/interfaces/IUser";
import {NotificationsService} from "@/services/NotficationsService";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import Login from "@/components/Login/Login.vue";
import Signup from "@/components/Signup/Signup.vue";

@Component({
  components: {
    VueGoogleAutocomplete,
    Login,
    Signup,
  }
})
export default class Header extends Vue{
  @Inject('userService')
  user_ser!: UserService;

  @Inject('notificationsService')
  notification_service!: NotificationsService;
  notifications: [] | null;
  user: IUser|null = null;
  showSearchBar: boolean;
  tooltip = true;
  place: any | null = null;
  openedMenu = false;
  constructor() {
    super();
    this.notifications=[];
    this.showSearchBar= true;
    /*if(this.$route.name=='landing'){
      this.showSearchBar= false;
    }*/
  }

  async mounted(){
    if (this.$route.query.token != null && this.$route.query.username != null) {
      const tokenObj = {
        username: this.$route.query.username,
        token: this.$route.query.token,
        expires_at: this.$route.query.expires_at
      }
      localStorage.setItem('token', JSON.stringify(tokenObj))
      await this.user_ser.updateUserLocalStorage(this.$route.query.username as string)
      const query = Object.assign({}, this.$route.query);
      delete query.token;
      delete query.expires_at;
      delete query.username;
      this.$router.replace({ query });
      window.location.reload()
    }
    const user = this.user_ser.getCurrentUser();
    if(user){
      this.user = user;
      // Weird hack for handcash since we don't have lastname all the time
      if (this.user.lastName == null) {
        this.user.lastName = ""
      }
      const x= await this.notification_service.getUserNotifications();
      if(x.status==200){
       this.notifications=x.data.notifications;
      }
    }
  }

  goHome() {
    this.$router.push({name: "home"});
  }
  getAddressData() {
    console.log('h')
  }
  getRoutePath(name: string,parameters: any){
    return this.$router.push({name: name, params: parameters});
  }
  async logout(){
    await this.user_ser.logout();
    if(this.$route.name=='home') {
      location.reload();
    } else {
      this.$router.push({name: "home"});
    }
  }
  findPlaceChanged(ret: any, place: any, id: any) {
    this.place = place;
    if (typeof place.place_id != "undefined") {
      this.getRoutePath("place", { id: place.place_id });
      if(this.$route.name=='place'){
        location.reload();
      }
    }
  }
  hideTooltip() {
    this.tooltip = false;
  }
  showTooltip() {
    this.tooltip = true;
  }
  openMenu(){
    this.openedMenu = !this.openedMenu;
  }


  openLogin() {
    (this.$refs["login"] as any).showModal();
  }

  openSignup() {
    (this.$refs["signup"] as any).showModal();
  }
  onLogin() {
    this.$router.push({ name: "dashboard" });
  }
  inputChange() {
    console.log("here");
  }
  onSignup() {
    this.$router.push({ name: "profile" });
  }
  writeReview() {
    if (this.user) {
      this.$router.push({ name: "dashboard" });
    } else {
      this.openLogin();
    }
  }
}
</script>
