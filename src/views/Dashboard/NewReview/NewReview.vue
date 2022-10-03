<template>
  <div class="new-review py-5">
    <div class="container">
      <div class="alert-container">
        <flash-message class="myCustomClass"></flash-message>
      </div>
      <div class="text-center mt-4">
        <b-modal ref="modal-help-text" title="Why set a paywall?" hide-footer>
          <p>You have the option to charge other users to read your review. The
          user will simply know other user's votes on the review and your user
          reputation. If you have no reputation on the site, it is not very
          likely a user will spend a lot of money to view your review. We
          recommend leaving some reviews without a paywall to build up your
          reputation before charging other users to view your content.</p>
        </b-modal>
      </div>
      <form @submit="onSubmit" data-vv-scope="contact-form">

        <div class="row align-items-center">
          <div class="col-12 col-md-auto">
            <h2 @click="getRoutePath('place',{'id':place_id})" class="place-detail__title">{{ place_name }}</h2>
          </div>
          <div class="col-12 col-md place-detail__title-actions">
            <button v-on:click="addFavoritePlace(place_id)" class="btn btn-link custom-tooltip">
              <font-awesome-icon :icon="['far', 'heart']"/>
              <span v-if="!checkUserWallet()" class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can add to favorite</span>
            </button>
          </div>
        </div>
            
        <div class="row">
          <div class="col-12 col-lg-8">
            <div class="row rating">
              <div class="col">
                <div class="row">
                  <div class="col-12 col-lg mb-2 mb-lg-3" v-for="(star_type, type_name) in stars" :key="type_name">
                    <div class="rating-item">
                      <p class="rating-text">{{ star_type.title }}</p>
                      <ul class="rating-stars" @mouseleave="clearStars(type_name)">
                        <li v-for="index in star_type.stars" :key="index" @mouseover="setActive(type_name, index)"
                            @click="setRate(type_name, index)">
                          <span class="star"
                                :class="{active: star_type.active >=index || star_type.rate >=index}"></span>
                        </li>
                      </ul>
                      <span class="rating-description">{{
                          rating_description[stars[type_name].active - 1] || rating_description[stars[type_name].rate - 1]
                        }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto rating-result">
                <span class="icon">
                  <font-awesome-icon :icon="['far', 'chevron-right']"/>
                </span>
                <h2> {{ rating_result }}</h2>
              </div>
            </div>
            <div class="row mb-5">
              <div class="col">
                <textarea placeholder="Write your review here" v-model="review_body" id="review-body" name="review-body"
                          class="form-control review-body"></textarea>
              </div>
            </div>
            <div class="row form-container">
              <div class="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3">
                <progress-bar
                    :options="options"
                    :value="uploadProgress"
                    v-show="showUploadProgressBar"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 mb-4">
                <div v-if="step==1" class="image-uploader"
                    @dragover.prevent @drop.prevent="handleFileDrop($event)">
                  <div id="image-uploader" class="image-uploader__drag-container" @dragleave="fileDragOut" @dragover="fileDragIn"
                      @drop="handleFileDrop($event)">

                              <div class="image-uploader__content">
                                <p class="image-uploader__title">Drag your photo here</p>
                                <div class="image-uploader__icon">
                                  <font-awesome-icon :icon="['fal', 'camera']"/>
                                </div>
                                <button type="button" class="btn btn-outline-primary">Or Browse Files</button>
                              </div>
                              <input type="file" name="file-input" multiple="True" class="image-uploader__input"
                          @change="handleFileInput($event)">

                    <ul style="display:none">
                      <li v-bind:key="index" v-for="(file, index) in files">
                        {{ file.name }} ({{ file.size }} b)
                        <button @click="removeFile(index)" title="Remove">X</button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div v-show="step==2" id="images-container" v-if="files.length > 0" class="image-uploader-list row mx-n2">
                  <div v-bind:key="index" v-for="(file, index) in files" class="col-12 col-sm-6 col-lg-4 mb-3 px-2">
                    <div class="image-uploader-list__item">
                      <img
                          :src="createUrl(file)"
                          class="image-uploader-list__item-image">
                      <span class="image-uploader-list__item-delete" @click="removeFile(index)">
                            <font-awesome-icon class="image-uploader-list__item-delete-icon" :icon="['far', 'trash-alt']"/>
                        </span>

                      <!--<textarea class="mt-3" placeholder="Add a caption"></textarea>-->
                    </div>
                  </div>
                </div>
                <div v-if="step==2">
                  <div>
                    <div class="image-uploader" @dragover.prevent @drop.prevent>
                      <div class="image-uploader__drag-container" @dragleave="fileDragOut"
                          @dragover="fileDragIn" @drop="handleFileDrop($event)">


                        <div class="image-uploader__content">
                          <p class="image-uploader__title">Drag your photo here</p>
                          <div class="image-uploader__icon">
                            <font-awesome-icon :icon="['fal', 'camera']"/>
                          </div>
                          <button type="button" class="btn btn-outline-primary">Or Browse Files</button>
                        </div>

                        <input @click="changeDragValue" type="file" name="file-input" multiple="True" class="image-uploader__input"
                              @change="handleFileInput($event)">


                        <ul style="display:none">
                          <li v-bind:key="index" v-for="(file, index) in files">
                            {{ file.name }} ({{ file.size }} b)
                            <span class="ml-3" @click="removeFile(index)"> <font-awesome-icon class="text-right"
                                                                                              style="margin-top: 13px;"
                                                                                              :icon="['fal', 'times']"/></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           <!-- <div class="row container no-gutters justify-content-start" v-if=verified> -->
            <div class="container" v-if=verified>
              <div class="row no-gutters justify-content-start">
                <div class="col-auto my-auto">
                  <span class="text-muted">Review verified by  </span>
                </div>
                <div class="col-auto">
                  <img src="@/assets/images/barpay-logo-white.png" height="40px"/>
                </div> 
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-3 offset-lg-1">
            <div class="new-review__side-wrapper">
              <div class="new-review__side-sticky">
                <div class="row justify-content-center">
                  <div class="col-12 col-sm-auto paywall">
                    <div class="new-review__paywall-money mb-4">
                      <div class="form-group row align-items-center mb-0">
                        <label for="exampleInputEmail1" class="col-12 col-sm-auto mb-3 mb-sm-0">Set paywall price <font-awesome-icon :icon="['fas', 'question-circle']" @click="showHelpModal"/></label>
                        <div class="input-group col-12 col-sm">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">$</span>
                          </div>
                          <input class="form-control" v-model.number="review_paywall" type="number" min="0.00" step="0.01" max="5" value="0.00" placeholder="0.00" v-on:change="paywallChanged"/>
                        </div>
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <p class="form-text text-danger" id="errorMessage"></p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12" v-if=!submittingReview>
                    <button class="btn btn-primary btn-lg">Submit Review</button>
                  </div>
                  <div class="col-12 spinner" v-else>
                    <b-spinner/>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </form>
      <div class="row">
        <div class="col-12">
          <Modal :show-handcash-modal="showHandcashModal" :title="'Top Up!'" :body="'You need to reset your spending limit in the Handcash app'" :icon="'times-circle'" :actions="[{ text:'Open Handcash', url:'https://app.handcash.io/', variant:'handcash', target:'_blank' }]"></Modal>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="./NewReview.scss" scoped></style>
<script lang="ts">
import {Component, Inject, Vue} from "vue-property-decorator";
import Tip from "@/components/Tip/Tip.vue";
import Modal from "@/components/Modal/Modal.vue";
import {UserService} from "@/services/UserService";
import {ReviewsService} from "@/services/ReviewsService";
import {PlaceService} from "@/services/PlaceService";
import {IUser} from "@/interfaces/IUser";
import {FavoritesService} from "@/services/FavoritesService";


@Component({
  components: {
    Tip,
    Modal,
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

export default class NewReview extends Vue {
  place_id: string;
  place_name: string;
  flash: any;
  submittingReview: boolean;
  review_body: string;
  review_paywall: number;
  @Inject('reviewsService')
  review_ser!: ReviewsService;
  @Inject('userService')
  user_ser!: UserService;

  @Inject('placeService')
  place_ser!: PlaceService;

  @Inject('favoritesService')
  favorites_ser!: FavoritesService;

  showHandcashModal: boolean;
  user: IUser | null = null;
  requestErrorMessage: string;
  latestTx: string;
  options: any;
  step: number;
  files: File[] = [];
  imageHashes: object[] = [];
  uploadProgress: number;
  showUploadProgressBar: boolean;
  dragImage: number;
  verified: boolean;
  verifiedCustomerLogo: string;

  constructor() {
    super();
    if (typeof this.$route.params.place_id == 'undefined') {
      this.$router.push({name: "dashboard"});
    }
    this.place_id = this.$route.params.place_id;
    this.place_name = this.$route.params.place_name;

    this.review_body = '';
    this.review_paywall = 0.00
    this.submittingReview = false;
    this.showHandcashModal = false;
    this.requestErrorMessage = '';
    this.latestTx = '';
    this.verified = false;  
    this.verifiedCustomerLogo = "@/assets/images/barpay-logo-white.png" //TODO: default in null and get customer logo
    const user = this.user_ser.getCurrentUser();
    if (user) {
      this.user = user;
    }
    this.options = {
      text: {
        color: '#FFFFFF',
        shadowEnable: true,
        shadowColor: '#000000',
        fontSize: 14,
        fontFamily: 'Helvetica',
        dynamicPosition: false,
        hideText: false
      },
      progress: {
        color: '#cc7a00',
        backgroundColor: '#333333'
      },
      layout: {
        height: 35,
        width: 140,
        verticalTextAlign: 61,
        horizontalTextAlign: 43,
        zeroOffset: 0,
        strokeWidth: 30,
        progressPadding: 0,
        type: 'line'
      }
    }
    this.uploadProgress = 0;
    this.showUploadProgressBar = false;
    this.step = 1;
    this.dragImage = 0;
  }

  async mounted() {
    if (typeof this.$route.params.review_id != 'undefined') {
      //fetch review here
      let fetched_review = await this.review_ser.getReview(this.$route.params.review_id);

      if (fetched_review.status == 200) {
        fetched_review = fetched_review.data;
        this.review_body = fetched_review.reviewBody;
        if (fetched_review.paywall != null) {
          this.review_paywall = fetched_review.paywall.cost;
        }
        this.stars['quality'].rate = fetched_review.ratings.quality;
        this.stars['experience'].rate = fetched_review.ratings.experience;
        this.stars['value'].rate = fetched_review.ratings.value;
        this.calculateRating();
        this.latestTx = fetched_review.latestTx;
        this.verified = fetched_review.verifiedInfo !== null; //TODO: update when the VerifiedBy object is made
      }
    }
  }

  showHelpModal() {
    (this.$refs['modal-help-text'] as any).show();
  }

  async onSubmit(e: any) {
    e.preventDefault();
    this.requestErrorMessage = '';
    const el = document.getElementById('errorMessage')
    if (el == null) {
      throw new Error('failed to find errorMessage div')
    }
    if (this.review_body == "") {
      el.innerHTML = 'Review Body is required';
      return '';
    }

    if (this.stars['quality'].rate == null || this.stars['experience'].rate == null || this.stars['value'].rate == null) {
      el.innerHTML = 'Please provide ratings before submitting review';
      return '';
    }
    el.innerHTML = '';
    if (this.user == null) {
      throw new Error('cannot create review with no user')
    }
    this.submittingReview = true
    await this.uploadImages();

    if (typeof this.$route.params.review_id != 'undefined') {
      const review = await this.review_ser.editReview(this.$route.params.review_id, this.latestTx, this.user, this.place_id, this.review_body, this.stars, this.imageHashes, this.review_paywall);

      if (review.status == 200) {
        this.flash('Your review has been successfully updated!', 'success', {timeout: 10000});
        this.$router.push({
          'name': 'dashboard',
          params: {'review': 'true', 'place_name': this.place_name, 'place_id': this.place_id}
        });
      } else {
        this.flash('Your review failed to be edited, please try again and if you continue to have problems please contact our support team', 'error', {timeout: 10000});
      }
    } else {
      const review = await this.review_ser.createReview(this.user, this.place_id, this.review_body, this.stars, this.imageHashes, this.review_paywall);
      if (review.status == 200) {
        this.flash('Your review has been successfully submitted!', 'success', {timeout: 10000});
        this.$router.push({
          'name': 'dashboard',
          params: {'review': 'true', 'place_name': this.place_name, 'place_id': this.place_id}
        });
      } else if (review.status == 555) {
        this.showHandcashModal = true
      } else {
        this.flash('Your review failed to be submitted, please try again and if you continue to have problems please contact our support team', 'error', {timeout: 10000});
      }
    }
    this.submittingReview = false
  }

  async uploadImages() {
    this.step = 1;
    this.showUploadProgressBar = true;
    let i = 0;
    let status = false;
    const progress = 100 / (this.files.length);
    for (i = 0; i < this.files.length; i++) {

      //upload images
      const uploadPlaceImage = await this.place_ser.uploadPlaceImage(this.files[i], this.place_id);
      if (uploadPlaceImage.status != 200) {
        this.flash(uploadPlaceImage.data.message, 'error', {timeout: 5000});
        continue;
      }
      if (uploadPlaceImage.status == 200) {
        status = true;
        this.imageHashes.push({'hash': uploadPlaceImage.data.hash, 'id': uploadPlaceImage.data.id});
        this.flash('Image has been uploaded', 'success', {timeout: 5000});
      }
      this.uploadProgress += parseInt(progress.toFixed(2));
    }
    this.showUploadProgressBar = false;

  }

  stars: any = {
    quality: {
      title: "Quality",
      stars: 5,
      active: null,
      rate: null,
    },
    experience: {
      title: "Experience",
      stars: 5,
      active: null,
      rate: null,
    },
    value: {
      title: "Value",
      stars: 5,
      active: null,
      rate: null,
    }
  };
  rating_description = [
    "Bad",
    "Okay",
    "Good",
    "Very good",
    "Excellent",
  ];
  rating_result = "0";

  setActive(type: string, stars: number) {
    this.stars[type].active = stars;
  }

  clearStars(type: string) {
    this.stars[type].active = null;
  }

  setRate(type: string, stars: number) {
    this.stars[type].rate = stars;
    this.calculateRating();
  }

  paywallChanged(e: any) {
    if (e.target.value === '') {
      this.review_paywall = 0
    }
  }

  calculateRating() {
    let total_rated = 0;
    for (const type in this.stars) {
      total_rated += this.stars[type].rate;
    }
    this.rating_result = (total_rated / 3).toFixed(1);
  }

  getRoutePath(name: string, parameters: any) {
    return this.$router.push({name: name, params: parameters});
  }

   handleFileDrop(e: any) {
     this.dragImage = 1;
    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles) return;
    // this tip, convert FileList to array
    ([...droppedFiles]).forEach((f: any) => {
      this.files.push(f);
    });
    this.step = 2;
  }

  handleFileInput(e: any) {

    if (this.dragImage == 0) {
      const input_files = e.target.files;
      if (!input_files) return;
      // this tip, convert FileList to array
      ([...input_files]).forEach((f: File) => {
        this.files.push(f);
      });
      this.step = 2;
    }

  }

  removeFile(fileKey: any) {
    this.files.splice(fileKey, 1);
    if (this.files.length == 0) {
      this.step = 1;
    }
  }

  fileDragIn() {
    console.log('');
  }

  fileDragOut() {
    console.log('');
  }

  showImageUploader() {
    this.step = 1;
  }

  hideImageUploader() {
    this.step = 1;
    this.files = [];
  }

  createUrl(imageFile: File) {
    return window.URL.createObjectURL(imageFile);
  }

  async addFavoritePlace(place_id: any) {
    if (this.checkUserWallet()) {
      const add_favorite_place = await this.favorites_ser.addFavorite(this.user!.id, 'location', place_id);
      if (add_favorite_place.status == 200) {
        this.flash('Place has been added to your favorites', 'success', {timeout: 5000});
      }
      if (add_favorite_place.status == 409) {
        this.flash('You have already added this place as a favorite', 'error', {timeout: 5000});
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
  changeDragValue(){
    this.dragImage=0;
  }
}
</script>
