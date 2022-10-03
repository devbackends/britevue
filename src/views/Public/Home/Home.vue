<template>
  <div class="home">
    <div class="alert-container">
      <flash-message class="myCustomClass"></flash-message>
    </div>
      <div class="align-items-center home-intro py-5">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-4">
              <h1 class="home-intro__title">How Do I Make Money?</h1>
            </div>
            <div class="col-12 col-md home-intro__description">
              <p class="paragraph-lg">
                Every interaction with your review earns you money. Britevue brings
                a microtransaction-based economy to online reviews. By utilizing
                fast and frictionless digital cash, you earn money when other users
                vote on your review, interact with your review, or leave you a tip
                if they found the review extra helpful.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="home-handcash py-5">
        <div class="container">
          <div class="row">
            <div class="col home-handcash__text">
                <p>
                  Britevue is an incentive-based online review platform where
                  users earn money for interactions with their reviews.
                  Businesses owners can manage their digital footprint and use
                  the Britevue platform to incentivize honest reviews from
                  customers.
                </p>
                <p>
                  Money earned on Britevue is held in your <span
                  class="hc-btn-txt">HandCash</span> account. Sign up and login
                  with <span class="hc-btn-txt">HandCash</span>, or create a
                  Britevue account to get started.  Answer some questions about
                  your hometown and get some money to get started!
                </p>
            </div>
            <div class="col-12 mb-4">
              <img
                src="@/assets/images/handcash_green_icon_2x.png"
                height="70"
                alt=""
              />
            </div>
            <div class="col-12">
              <button
                type="button"
                v-if="!user"
                v-on:click="signup"
                class="btn btn-handcash btn-lg"
              >
                Sign me Up!
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="container py-5">
        <div class="row text-center">
          <div class="col-md-4">
            <div class="sec-3-card">
              <div class="sec-3-card-icon">
                <img src="@/assets/images/reviews_icon.svg" alt="" />
              </div>
              <div class="sec-3-card-header text-primary">
                <h3>Reviews</h3>
              </div>
              <div class="sec-3-card-body">
                <p>
                  Britevue brings proper incentives to online reviews by allowing
                  reviewers to own and monetize their data. By utilizing
                  blockchain technology, for the first time in history reviewers
                  can have true data ownership over their intellectual property.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="sec-3-card">
              <div class="sec-3-card-icon">
                <img src="@/assets/images/reputation_icon.svg" alt="" />
              </div>
              <div class="sec-3-card-header text-primary">
                <h3>Auditability</h3>
              </div>
              <div class="sec-3-card-body">
                <p>
                  Built on blockchain technology, every action taken on the site
                  is stored in an immutable audit trail. Consumers can be certain
                  that Britevue is not manipulating review data or engaging in
                  censorship.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="sec-3-card">
              <div class="sec-3-card-icon">
                <img src="@/assets/images/rewards_icon.svg" alt="" />
              </div>
              <div class="sec-3-card-header text-primary">
                <h3>Rewards</h3>
              </div>
              <div class="sec-3-card-body">
                <p>
                  Reviewers spend a lot of time leaving thoughtful reviews, but
                  for many consumers it’s not worth the time and effort to leave a
                  high-quality review. In Britevue, every review you leave has the
                  potential to make money. Every interaction with your review
                  earns you revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecentReviews @success="createSuccess"  @error="createError"  :user="user" ></RecentReviews>
  </div>
</template>
<style lang="scss" scoped>
@import "Home";
</style>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import RecentReviews from "@/components/RecentReviews/RecentReviews.vue";
import { UserService } from "@/services/UserService";
import { IUser } from "@/interfaces/IUser";
import {ReviewsService} from "@/services/ReviewsService";

@Component({
  name: "home",
  components: {
    RecentReviews,
  },
  metaInfo:{
    title: `Britevue - Blockchain verified reviews where reviewers get paid`,
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

export default class Home extends Vue {
  @Inject("userService")
  user_ser!: UserService;

  @Inject('reviewsService')
  review_ser!: ReviewsService;

  flash: any;
  user: IUser | null = null;

  constructor() {
    super();
  }

  mounted() {
    if (this.$route.query.error != null) {
      switch(this.$route.query.error) {
        case "1":
          this.flash("Something went wrong connecting to Handcash. Please try again.", "error", {timeout: 10000})
          break
        case "2":
          this.flash("No user account was found created with Handcash. Please create an account or login with your username and password", "error", {timeout: 10000})
          break
        case "3":
          this.flash("Failed to signup via handcash. Please try again or create an account with Britevue", "error", {timeout: 10000})
          break
        case "4":
          this.flash("A britevue user already exists for this handcash wallet. Please login instead", "error", {timeout: 10000})
          break
        case "5":
          this.flash("A britevue user already exists with this handcash wallet. You are unable to link multiple accounts with the same wallet. Please contact support if you need assistance.", "error", {timeout: 10000})
          break
        default:
          this.flash("An unexpected error occurred")
      }
    }
    const user = this.user_ser.getCurrentUser();
    if (user) {
      this.user = user;
      //check user token is expired
      const checkUser = this.user_ser.getUser(this.user.id);
    }
  }
  signup() {
    document.getElementById("header-signup-button")!.click();
  }
  createSuccess(value: any){
    this.flash(value, "success", {timeout: 10000})
  }
  createError(value: any){
    this.flash(value, "error", {timeout: 10000})
  }

}
</script>
