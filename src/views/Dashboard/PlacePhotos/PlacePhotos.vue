<template>
  <div class="container place-photos py-3 py-sm-5">
    <div class="row align-items-center">
      <div class="col-12 col-md-auto">
        <h2 @click="getRoutePath('place',{'id':place.place_id})" class="place-detail__title">{{ place.name }}</h2>
      </div>
      <div class="col-12 col-md place-detail__title-actions">
          <button  class="btn btn-link custom-tooltip">
            <font-awesome-icon :icon="['far', 'heart']"/>
            <span  v-if="!checkUserWallet()"  class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can add to favorite</span>
          </button>
          <button class="btn link custom-tooltip">
            <font-awesome-icon :icon="['far', 'link']"/>
            <span class="custom-tooltip-text custom-tooltip-text-top">Copy Link</span>
          </button>
      </div>
    </div>

    <!-- Place rating -->
    <div class="row mb-4">
      <div class="col">
        <div class="place-detail__rating">
          <img src="@/assets/images/star.svg" alt="Rating">
          <div class="place-detail__rating-value">
            <span class="place-detail__rating-value-number">
              {{ place.rating }}
            </span>
            <span v-if="typeof place.reviews!='undefined'">({{ place.reviews_count }} reviews)
            </span>
          </div>
        </div>
        <ul class="place-detail__rating-details" v-if="typeof place.britevue_ratings!='undefined'">
          <li>
            <span class="mr-2">Quality</span>
            <img src="@/assets/images/star_grey.svg" alt="Quality">
            <span>{{ place.britevue_ratings.quality }}</span>
          </li>
          <li>
            <span class="mr-2">Experience</span>
            <img src="@/assets/images/star_grey.svg" alt="Experience">
            <span>{{ place.britevue_ratings.experience }}</span>
          </li>
          <li>
            <span class="mr-2">Value</span>
            <img src="@/assets/images/star_grey.svg" alt="Value">
            <span>{{ place.britevue_ratings.value }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="row align-items-center mb-5">

      <div class="col-12 col-sm mb-3 mb-sm-0">
          <a @click="writeReview(place.place_id,place.name)" href="javascript:;"
             class="btn btn-primary btn-lg custom-tooltip d-block d-sm-inline-block">
            Write a Review
            <span  v-if="!checkUserWallet()" class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can write a review</span>
          </a>
      </div>
      <div class="col-12 col-sm place-photos__back">
        <a @click="getRoutePath('place',{'id':place.place_id})" href="javascript:;" class="btn btn-outline-dark">
          <span class="icon">
            <font-awesome-icon :icon="['far', 'chevron-left']" />
          </span>
          Back to Details
        </a>
      </div>
    </div>


        <div v-if="typeof place.britevue_photos != 'undefined' && place.britevue_photos != null" class="row place-photos__images-list">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 place-photos__images-list-item" v-for="(photo, key) in place.britevue_photos" :key="key">
            <img  :src="photo.url" alt="" class="img-fluid"  @error="imageUrlAlt">
          </div>
        </div>
        <div v-if="typeof place.photos != 'undefined' && place.photos != null" class="row place-photos__images-list">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 place-photos__images-list-item" v-for="(photo, key) in place.photos.slice(0,showImages)" :key="key">
            <img  :src="`https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyDMqrI8hMqiyIPdQUkRUerdohx28Fuv4wE&photo_reference=`+photo.photo_reference+`&maxwidth=600`" alt="" class="img-fluid"  @error="imageUrlAlt">
          </div>
        </div>


    <div class="text-center d-flex justify-content-center pt-4">
      <div v-if="typeof place.photos != 'undefined' && place.photos != null" v-on:click="showMoreImages()" class="text-center">
        <img src="@/assets/images/arrow_down.svg" alt="Show More ReviewsService">
        <p>Load More Photos</p>
      </div>
    </div>

  </div>
</template>
<style lang="scss" src="./PlacePhotos.scss" scoped></style>
<script lang="ts">
import {Component, Inject, Vue} from "vue-property-decorator";
import Tip from "@/components/Tip/Tip.vue";
import {UserService} from "@/services/UserService";
import {IUser} from "@/interfaces/IUser";
@Component({
  components: {
    Tip,
  },
  metaInfo:{
    title: "Britevue - Blockchain verified reviews where reviewers get paid",
    meta: [
      { name:'title',content:'Britevue - Blockchain verified reviews where reviewers get paid'},
      { name: 'description', content:  'Begin earning money for your reviews of businesses and places with Britevue. We will pay you for information about your hometown to get started!'},
      { itemprop: 'name', content: "Britevue"},
      { itemprop: 'description', content: "Begin earning money for your reviews of businesses and places with Britevue. We will pay you for information about your hometown to get started!"},
      { itemprop: 'image', content:  require('@/assets/images/logo_black.svg')},
      { property: 'og:type', content: "website"},
      { property: 'og:url', content: "https://britevue.com/"},
      { property: 'og:title', content: "Britevue - Blockchain verified reviews where reviewers get paid"},
      { property: 'og:description', content: "Begin earning money for your reviews of businesses and places with Britevue. We will pay you for information about your hometown to get started!"},
      { property: 'og:image', content:  require('@/assets/images/logo_black.svg')},
      { property: 'og:site_name', content: 'britevue'},
      { name: 'twitter:card', content: "summary_large_image"},
      { name: 'twitter:url', content: "https://britevue.com/"},
      { name: 'twitter:title', content: "Britevue - Blockchain verified reviews where reviewers get paid"},
      { name: 'twitter:description', content: "Begin earning money for your reviews of businesses and places with Britevue. We will pay you for information about your hometown to get started!"},
      { name: 'twitter:image', content: require('@/assets/images/logo_black.svg') },
    ]
  }
})
export default class PlacePhotos extends Vue{

  place!: string;
  showImages: number;

  @Inject('userService')
  user_service!: UserService;

  profile: IUser | null = null;

  constructor() {
    super();
    if (typeof this.$route.params.place != 'undefined') {
      this.place = this.$route.params.place;
    } else {
      this.$router.push({name: "dashboard"});
    }

    this.showImages=4;
    this.user_service.updateUserLocalStorage("")
    const user = this.user_service.getCurrentUser();
    if (user) {
      this.profile = user;
      //check user token is expired
      const checkUser = this.user_service.getUser(this.profile.id);
    }
  }
  async mounted(){
    console.log('');
  }

  tip(amount: string){
    console.log('tipping:', amount);
  }
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  imageUrlAlt(event: any) {
    event.target.src = require('@/assets/images/no-photo-avatar.png');
  }
  showMoreImages() {
    this.showImages += 4;
  }
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  getRoutePath(name: string, parameters: any) {
    return this.$router.push({name: name, params: parameters});
  }
  writeReview(place_id: string,place_name: string) {
    if (this.checkUserWallet()) {
      this.getRoutePath('new_review',{'place_id':place_id,'place_name':place_name})
    }
  }
  checkUserWallet() {
    if (this.profile) {
      if (this.profile.wallet) {
        return true;
      } else {
        return false;
      }
    }else{
      return false;
    }
  }
}
</script>
