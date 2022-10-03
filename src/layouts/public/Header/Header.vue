<template>
<div>
  <div class="header-home" :class="[scrollPosition < 300 ? 'header-home--top' : '', scrollPosition < 300 ? 'header-home--hide-search' : '']">
    <innerHeader></innerHeader>
  </div>
  <div class="page-section header">
    <div class="container">
          
          <div class="row header__britevue-logo">
            <div class="col-md-12 text-center text-white">
              <div class="logo">
                <img src="@/assets/images/logo.svg" alt="" />
              </div>
              <h4 class="header-text">
                Blockchain verified reviews where reviewers get paid
              </h4>
            </div>
          </div>
          <div class="row header__search">
            <div class="col-10 offset-1 col-md-6 offset-md-3">
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">Find</div>
                </div>
                <vue-google-autocomplete
                  id="homeSearchBar"
                  class="form-control"
                  placeholder="places..."
                  v-bind:enable-geolocation="true"
                  types="establishment"
                  v-on:placechanged="findPlaceChanged"
                  v-on:blur="showTooltip"
                  v-on:focus="hideTooltip"
                >
                </vue-google-autocomplete>
                <div class="header__search-tooltip" v-if="tooltip">
                  Start finding a place and leave a review that will help other
                  people
                </div>
              </div>

              <!--<div class="col-7 col-lg-4 right-input">
              <span class="search-text right-text">Near</span>
              <input type="text" readonly class="form-control" placeholder="Chicago, IL">
              <span class="search-icon">
                <img src="@/assets/images/search.svg" alt="Search" @click="getRoutePath('place',{'place_id':place.place_id,'place_name':place.name})"/>
              </span>
            </div>-->
            </div>
          </div>

    </div>
  </div>
</div>
</template>

<style lang="scss" scoped src="./Header.scss"></style>

<script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";
import Login from "@/components/Login/Login.vue";
import Signup from "@/components/Signup/Signup.vue";
import { UserService } from "@/services/UserService";
import VueGoogleAutocomplete from "vue-google-autocomplete";

import innerHeader from "@/layouts/dashboard/Header/Header.vue";

import { IUser } from "@/interfaces/IUser";
@Component({
  components: {
    innerHeader,

    VueGoogleAutocomplete,
  },
})
export default class Header extends Vue {
  @Inject("userService")
  user_ser!: UserService;
  user: IUser | null = null;
  place: any | null = null;
  tooltip = true;
  scrollPosition = 0;
  findPlaceChanged(ret: any, place: any, id: any) {
    this.place = place;
    if (typeof place.place_id != "undefined") {
      this.getRoutePath("place", { id: place.place_id });
    }
  }

  updateScroll() {
    this.scrollPosition = window.scrollY
  }
  
  mounted() {
    const user = this.user_ser.getCurrentUser();
    if (user) {
      this.user = user;
    }
    window.addEventListener('scroll', this.updateScroll);
  }

  destroy() {
    window.removeEventListener('scroll', this.updateScroll)
  }

  getRoutePath(name: string, parameters: any) {
    return this.$router.push({ name: name, params: parameters });
  }



  hideTooltip() {
    this.tooltip = false;
  }
  showTooltip() {
    this.tooltip = true;
  }
}
</script>
