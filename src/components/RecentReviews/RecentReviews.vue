<template>
<div class="recent-activity py-5">
  <div id="activities-icon" class="recent-activity__separator">
    <img src="@/assets/images/activities.svg" alt="">
  </div>
  
    <div class="container">
          <h3 class="recent-activity__title">Recent Activity</h3>
          <div v-if="loadingReviews" class="recent-activity__title">
            <b-spinner class="spinner"/>
          </div>
          <div class="row" v-if="activities.length > 0">
            <div class="col">
              
              <div class="row">
                <div class="col-12 col-sm-6 col-md-4" v-for="activity in activities.slice(0,showImages)" :key="activity.id">
                  <div class="activity-card">
                    <!-- <div class="activity-card__header"></div> -->
                    <div class="activity-card__body">
                      <p v-on:click="getRoutePath('place', { id: activity.placeID })" class="activity-card__header-placename" >{{activity.locationName}}</p>
                      <div v-on:click="getRoutePath('place', { id: activity.placeID })" class="mb-3">
                        <img  v-if="activity.photos != null && activity.photos.length > 0" :src="activity.photos[0].url"  @error="imageUrlAlt" class="activity-card__body-image" alt="Card image cap">
                        <img v-else src="@/assets/images/activity-default-image.png" alt="Card image cap" class="activity-card__body-image">
                      </div>
                      <!--<h5 class="card-title">{{ activity.title }}</h5>-->

                      <div class="activity-card__header-info">
                        <div class="row align-items-center">
                          <div class="col-auto pr-0">
                            <img v-if="activity.userInfo.profilePhoto.url == ''" class="activity-card__header-image" :id="`user-activity-`+activity.id"  src="@/assets/images/person.png" alt="Card image cap">
                            <img v-else class="activity-card__header-image" :id="`user-activity-`+activity.id"  :src="activity.userInfo.profilePhoto.url" alt="Card image cap">
                          </div>
                          <div class="col">
                            <p class="activity-card__header-name clickable" @click="getRoutePath('profile',{'id':activity.userInfo.id})">{{ activity.userInfo.firstName }} {{ activity.userInfo.lastName }}</p>
                            <p class="activity-card__header-date" >Wrote a review on  {{ new Date(activity.timestamp).toDateString() }}</p>
                          </div>
                          <div class="col-auto">
                            <div class="place-card__rating" :class="activity.paywall && activity.paywall.cost != 0 ? 'blur' : ''">
                              <img src="@/assets/images/star.svg" alt="Rating" />
                              <p>
                                <span class="place-card__rating-value">{{ activity.ratingAverage }}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p class="activity-card__body-text" :class="activity.paywall && activity.paywall.cost != 0 ? 'blur' : ''">{{activity.reviewBody}}</p>
                      <!--<p class="user-rep">User Rep: &lt;!&ndash;{{ activity.user.reputation }}&ndash;&gt;</p>-->
                    </div>
                    <div class="activity-card__footer">
                      <div class="row" :class="activity.paywall && activity.paywall.cost != 0 ? 'blur' : ''">
                        <div class="col-auto pr-0">
                          <div class="activity-card__footer-vote custom-tooltip"  @click="upvote(activity.id,$event)"  v-if="user">
                            <b-spinner :id="`upvote-spinner-`+activity.id" class="spinner  d-none"/>
                            <img  :id="`upvote-icon-`+activity.id"  src="@/assets/images/upvote.svg" alt="Up Vote">
                            <span :id="`upvote-`+activity.id">{{ activity.upvotes }}</span>
                          </div>
                        </div>
                        <div class="col-auto">
                          <div class="activity-card__footer-vote" @click="downvote(activity.id,$event)"  v-if="user">
                            <b-spinner :id="`downvote-spinner-`+activity.id" class="spinner d-none"/>
                            <img  :id="`downvote-icon-`+activity.id" src="@/assets/images/downvote.svg" alt="Down Vote">
                            <span :id="`downvote-`+activity.id">{{ activity.downvotes }}</span>
                          </div>
                        </div>
                        <div class="col text-right" v-if="user">
                          <div v-if="activity.user!=user.id && user.wallet!=''">
                            <Tip :tip-status="tipStatus" @onSubmit="onSubmit" :user-id="activity.user" :review-id="activity.id"></Tip>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col text-center">
                  <div v-if="activities.length > showImages"  v-on:click="showMoreImages()" class="recent-activity__show-more">
                    <img src="@/assets/images/arrow_down.svg" alt="Show More">
                    <p class="">Show More Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      <div class="row">
        <div class="col-12">
          <Modal :show-handcash-modal="showHandcashModal" :title="'Top Up!'" :body="'You need to reset your spending limit in the Handcash app'" :icon="'times-circle'" :actions="[{ text:'Open Handcash', url:'https://app.handcash.io/', variant:'handcash', target:'_blank' }]"></Modal>
        </div>
      </div>

    </div>
  
</div>
</template>
<style lang="scss" scoped>
@import './RecentReviews.scss';

</style>
<script lang="ts">
import {Vue, Component, Inject, Prop} from 'vue-property-decorator';
import {IReview} from "@/interfaces/IReview.ts";
import {UserService} from "@/services/UserService";
import {ReviewsService} from "@/services/ReviewsService";
import {IUser} from "@/interfaces/IUser";
import Login from "@/components/Login/Login.vue";
import Signup from "@/components/Signup/Signup.vue";
import Tip from "@/components/Tip/Tip.vue";
import Modal from "@/components/Modal/Modal.vue";
@Component({
  components: {
    Tip,
    Modal
  }
})
export default class RecentReviews extends Vue{

  @Inject('userService')
  user_service!: UserService;

  @Inject('reviewsService')
  review_ser!: ReviewsService;
  showImages: number;
  activities:  IReview[] ;
  tipStatus: boolean;
  loadingReviews: boolean;
  showHandcashModal: boolean;

  @Prop() user!:  IUser | null;

  constructor() {
    super();
    this.showImages=6;
    this.loadingReviews=false;
    this.activities = [];
    this.tipStatus=false;
    this.showHandcashModal=false;
  }
  async mounted(){
    await  this.loadActivities();
  }
  async loadActivities(){
    this.loadingReviews=true

    const reviews = await this.review_ser.getRecentActivities();

    if (reviews.length > 0) {
      this.activities = reviews;
    }
    this.loadingReviews=false
  }


  imageUrlAlt(event: any) {
    event.target.src = require('@/assets/images/test/restaurant.png');
  }

  showMoreImages() {
    this.showImages +=6;
  }
  getRoutePath(name: string, parameters: any) {
    return this.$router.push({name: name, params: parameters});
  }

  async onSubmit(value: any,userId: any,reviewId: any ){
    const sendTip = await this.review_ser.sendTip(value,userId,reviewId);
    if (sendTip.status == 200) {
      this.$emit('success', 'Your Tip has been sent successfully');
      this.tipStatus=true;
    }else if(sendTip.status==555){
      this.showHandcashModal=true;
      this.tipStatus=false;
    }
    else{
      this.$emit('error', sendTip.data.message);
      this.tipStatus=false;
    }
  }

  async upvote(review_id: string, e: any) {
    e.preventDefault();

    if(this.checkUserWallet()){
      const spinner=document.getElementById('upvote-spinner-' + review_id) as HTMLElement;
      const upvoteElement=document.getElementById('upvote-' + review_id) as HTMLElement;
      const upvoteIcon=document.getElementById('upvote-icon-' + review_id) as HTMLElement;
      spinner.classList.remove('d-none');
      upvoteElement.classList.add('d-none');
      upvoteIcon.classList.add('d-none');
      const res = await this.review_ser.upvoteReview(this.user!.id, review_id);
      spinner.classList.add('d-none');
      upvoteElement.classList.remove('d-none');
      upvoteIcon.classList.remove('d-none');
      if (res.status == 200) {
        const upvoteResult = res.data
        if (typeof upvoteResult.txid != 'undefined') {
          const vote = upvoteElement!.textContent;
          upvoteElement!.innerHTML = (parseInt(vote!) + 1).toString();
          this.$emit('success', 'Successfully upvoted review');
        }
      } else if (res.status == 555) {
        this.showHandcashModal=true;
      } else {
        const msg = res.data.message
        if (typeof msg != 'undefined') {
          this.$emit('error', msg);
        }
      }
    }
  }
  async downvote(review_id: string, e: any) {
    e.preventDefault();
    if(this.checkUserWallet()){
      const spinner=document.getElementById('downvote-spinner-' + review_id) as HTMLElement;
      const downvoteElement=document.getElementById('downvote-' + review_id) as HTMLElement;
      const downvoteIcon=document.getElementById('downvote-icon-' + review_id) as HTMLElement;
      spinner.classList.remove('d-none');
      downvoteElement.classList.add('d-none');
      downvoteIcon.classList.add('d-none');
      const res = await this.review_ser.downReview(this.user!.id, review_id);
      spinner.classList.add('d-none');
      downvoteElement.classList.remove('d-none');
      downvoteIcon.classList.remove('d-none');
      if (res.status == 200) {
        const downvoteResult = res.data
        if (typeof downvoteResult.txid != 'undefined') {
          const vote = downvoteElement!.textContent;
          downvoteElement!.innerHTML = (parseInt(vote!) + 1).toString();
          this.$emit('success', 'Successfully downvoted review');
        }
      } else {
        const msg = res.data.message
        if (typeof msg != 'undefined') {
          this.$emit('error', msg);
        }
      }
    }
  }
  checkUserWallet() {
    if (this.user) {
      if (this.user.wallet) {
        return true;
      } else {
        return false;
      }
    }
  }

}
</script>
