<template>
  <div>
    <div>
      <div class="alert-container">
        <flash-message class="myCustomClass"></flash-message>
      </div>
    </div>
    <div v-if="loadingPlace" class="col-12 col-md py-3 py-sm-5 text-center">
      <b-spinner class="spinner"/>
    </div>
    <div class="place-detail">
      <div class="container-fluid">
        <div class="row">
          <div v-if="place" class="col-12 col-md py-3 py-sm-5">
            <div class="row">
              <div class="col-12 col-md-8">
                <div class="pl-0 pl-md-5">
                  <!-- Place title -->
                  <div class="row align-items-center">
                    <div class="col-12 col-md-auto">
                      <h2 class="place-detail__title">{{ place.name }}</h2>
                    </div>
                    <div class="col-12 col-md place-detail__title-actions">
                      <button v-on:click="addFavoritePlace(place.place_id)" class="btn btn-link custom-tooltip">
                        <font-awesome-icon :icon="[isFavorite ? 'fas' : 'far', 'heart']"/>
                        <span  v-if="!checkUserWallet()"  class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can add to favorite</span>
                      </button>
                      <button v-on:click="copyToClipboard" class="btn link custom-tooltip">
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
                        <div v-if="place.review_total > 0" class="place-detail__rating-value">
                          <span v-if="typeof place.britevue_ratings!='undefined'" class="place-detail__rating-value-number">
                            {{ place.britevue_ratings.average }}
                          </span>
                          <span v-if="typeof place.reviews!='undefined'">({{ place.review_total }} reviews)
                          </span>
                        </div>
                        <div v-else class="place-detail__rating-value">
                          <span class="place-detail__rating-value-number">
                            N/A
                          </span>
                        </div>
                      </div>
                      <ul class="place-detail__rating-details" v-if="typeof place.britevue_ratings!='undefined' && place.review_total > 0">
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
                      <ul class="place-detail__rating-details" v-else>
                        <li>
                          <span class="mr-2">Quality</span>
                          <img src="@/assets/images/star_grey.svg" alt="Quality">
                          <span>N/A</span>
                        </li>
                        <li>
                          <span class="mr-2">Experience</span>
                          <img src="@/assets/images/star_grey.svg" alt="Experience">
                          <span>N/A</span>
                        </li>
                        <li>
                          <span class="mr-2">Value</span>
                          <img src="@/assets/images/star_grey.svg" alt="Value">
                          <span>N/A</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- Place info
                  // TODO: All of this needs to be information we control. For now I'm commenting it out
                  <div class="row mb-4">
                    <div class="col">
                      <ul class="place-detail__features">
                        <li>
                          <span>$$</span>
                          {{ place.types[0] }}
                        </li>
                                          <li class="divider"></li>
                                          <li>
                                            <img src="@/assets/images/check.svg" alt="Dine-in">
                                            Dine-in
                                          </li>
                                          <li>
                                            <img src="@/assets/images/check.svg" alt="Dine-in">
                                            Takeaway
                                          </li>
                                          <li>
                                            <img src="@/assets/images/x.svg" alt="Dine-in">
                                            No-contact delivery
                                          </li>
                      </ul>
                    </div>
                  </div>-->
                  <!-- Place actions -->
                  <div class="row">
                    <div class="col">
                      <div class="place-detail__actions">
                        <button @click="writeReview()"
                                class="btn btn-primary btn-lg custom-tooltip d-block d-sm-inline-block mr-0 mr-sm-3 mb-3 mb-sm-0">Write a Review
                          <span v-if="!checkUserWallet()" class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can write a review</span>
                        </button>
                        <a v-on:click="showImageUploader" href="javascript:;" class="btn btn-outline-primary custom-tooltip d-block d-sm-inline-block">
                          <font-awesome-layers full-width class="fa-1x mr-1">
                            <font-awesome-icon class="text-right" :icon="['fal', 'camera']"/>
                          </font-awesome-layers>
                          Add a Photo
                          <span v-if="!checkUserWallet()" class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can write a review</span>
                        </a>
                      </div>
                      <progress-bar
                          :options="options"
                          :value="uploadProgress"
                          v-show="showUploadProgressBar"
                      />
                    </div>
                  </div>
                  <!-- Image uploader -->
                  <div class="row">
                    <div class="col">


                      <div class="image-uploader mb-5" v-show="step==1" id="image-uploader" v-if="files.length == 0" @dragover.prevent @drop.prevent>
                        <span v-show="step > 0" v-on:click="hideImageUploader" id="close-image-uploader" class="image-uploader__close">
                          <font-awesome-icon style="font-size: 36px;" :icon="['fal', 'times']"/>
                        </span>
                        <div class="image-uploader__drag-container" @dragleave="fileDragOut" @dragover="fileDragIn" @drop="handleFileDrop($event)">
                          <div class="image-uploader__content">
                            <p class="image-uploader__title">Drag your photo here</p>
                            <div class="image-uploader__icon">
                              <font-awesome-icon :icon="['fal', 'camera']"/>
                            </div>
                            <button type="button" class="btn btn-outline-primary">Or Browse Files</button>
                          </div>
                          <input type="file" name="file-input" class="image-uploader__input" multiple="True"
                                 @change="handleFileInput($event)">
                          <ul style="display:none">
                            <li v-bind:key="index" v-for="(file, index) in files">
                              {{ file.name }} ({{ file.size }} b)
                              <button @click="removeFile(index)" title="Remove">X</button>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div v-show="step==2" id="images-container" v-if="files.length > 0" class="row image-uploader-list mx-n2">
                        <div v-bind:key="index" v-for="(file, index) in files" class="col-12 col-sm-6 col-md-4 px-2 my-2">
                          <div class="image-uploader-list__item">
                            <img
                                :src="createUrl(file)" class="image-uploader-list__item-image">
                            <span class="image-uploader-list__item-delete" @click="removeFile(index)">
                              <font-awesome-icon class="image-uploader-list__item-delete-icon" :icon="['far', 'trash-alt']"/>
                          </span>
                            <!--<textarea class="mt-3" placeholder="Add a caption"></textarea>-->
                          </div>
                        </div>
                        <div class="col-12 px-2 text-center mt-2">
                          <button @click="uploadImages" class="btn btn-primary">
                            <span>
                              <font-awesome-icon class="text-right" :icon="['far', 'arrow-to-top']"/>
                            </span>
                            Upload
                          </button>
                        </div>
                      </div>

                      <div class="image-uploader" v-show="step==2" id="image-uploader" v-if="files.length > 0" @dragover.prevent @drop.prevent>
                        <span v-show="step > 0" v-on:click="hideImageUploader" id="close-image-uploader" class="image-uploader__close">
                          <font-awesome-icon style="font-size: 36px;" :icon="['fal', 'times']"/>
                        </span>
                        <div class="image-uploader__drag-container" @dragleave="fileDragOut" @dragover="fileDragIn" @drop="handleFileDrop($event)">
                          <div class="image-uploader__content">
                            <p class="image-uploader__title">Drag more photos here</p>
                            <div class="image-uploader__icon">
                              <font-awesome-icon :icon="['fal', 'camera']"/>
                            </div>
                            <button type="button" class="btn btn-outline-primary">Or Browse Files</button>
                          </div>
                          <input type="file" name="file-input" class="image-uploader__input" multiple="True"
                                 @change="handleFileInput($event)">
                          <ul style="display:none">
                            <li v-bind:key="index" v-for="(file, index) in files">
                              {{ file.name }} ({{ file.size }} b)
                              <button @click="removeFile(index)" title="Remove">X</button>
                            </li>
                          </ul>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="reviews">
                    <div class="row mb-4">
                      <div class="col">
                        <h4>Reviews</h4>
                      </div>
                      <div class="col-auto text-right">
                        <select id="sort-reviews" v-on:change="sortReviews()" name="sort" class="custom-select sort">
                          <option value="">Sort by</option>
                          <option value="name">Name</option>
                          <option value="date">Date</option>
                        </select>
                      </div>
                    </div>

                    <div v-if="loadingReviews" class="col-auto text-center">
                      <b-spinner class="spinner"/>
                    </div>
                    <div v-else-if="reviews.length == 0" class="col-auto text-center">
                      <h4>No reviews yet</h4>
                    </div>

                    <div class="activity-card" v-for="review in reviews.slice(0,showReviews)" :key="review.id">

                      <!-- OLD Condition applied to the review div <div v-show="!review.paywall || review.paywall.cost == 0 || review.user == profile.id || review.paywall.paidFor" class="row no-gutters"> -->

                      <div class="row no-gutters">
                        <div class="col-12 col-sm-auto pr-0 pr-sm-3 mb-3 mb-sm-0">
                          <img @click="openReviewImageModel(review.photos)" v-if="review.photos.length > 0" :src="review.photos[0].url" alt="Place" class="activity-card__header-horizontal-image">
                          <img v-else src="@/assets/images/no-photo-avatar-1.png" alt="Place" class="activity-card__header-horizontal-image">
                        </div>
                        <div class="col-12 col-sm">
                          <div class="activity-card__header">
                            <div class="row align-items-center">
                              <div class="col-auto pr-0">
                                <img v-if="review.userInfo.profilePhoto.url == ''" class="activity-card__header-image" src="@/assets/images/person.png" :alt="review.user.name">
                                <img v-else class="activity-card__header-image" :src="review.userInfo.profilePhoto.url" :alt="review.user.name">
                              </div>
                              <div class="col">
                                  <div class="row">
                                    <div class="col">
                                      <p class="activity-card__header-username clickable" @click="getRoutePath('profile',{'id':review.userInfo.id})">{{ review.userInfo.firstName }} {{ review.userInfo.lastName }}</p>
                                    </div>
                                    <div class="col-auto">
                                      <p :class="review.userInfo.reputation < 2 ? review.userInfo.reputation < 0 ? 'text-danger' : 'text-warning' : 'text-success'"><strong>Reputation: {{ review.userInfo.reputation }}</strong></p>
                                    </div>
                                  </div>
                                  <p class="activity-card__header-date" >{{ new Date(review.timestamp).toDateString() }}</p>
                              </div>
                            </div>
                          </div>
                          <div class="activity-card__body">
                            <div class="row">
                              <div class="col">
                                <div class="place-card__rating" :class="review.paywall && review.paywall.cost != 0 && review.user != profile.id && !review.paywall.paidFor ? 'blur' : ''">
                                  <img src="@/assets/images/star.svg" alt="Rating" />
                                  <p>
                                    <span class="place-card__rating-value">{{ review.ratingAverage }}</span>
                                  </p>
                                </div>
                              </div>
                              <div class="col text-right">
                                <p><strong>Score: {{ review.score }}</strong></p>
                              </div>
                            </div>
                            <div class="row" v-if="review.paywall && review.paywall.cost != 0">
                              <div class="col text-right">
                                <p><strong>Cost: ${{ review.paywall.cost }}</strong></p>
                              </div>
                            </div>

                            <p class="card-text" :class="review.paywall && review.paywall.cost != 0 && review.user != profile.id && !review.paywall.paidFor ? 'blur' : ''">{{ review.reviewBody }}</p>
                            <!--<p class="user-rep">User Rep: &lt;!&ndash;{{ activity.user.reputation }}&ndash;&gt;</p>-->
                          </div>
                          <div class="activity-card__footer">
                            <div class="row" :class="review.paywall && review.paywall.cost != 0 && review.user != profile.id && !review.paywall.paidFor ? 'blur' : ''">
                              <div class="col-auto pr-0 my-auto">
                                <div class="activity-card__footer-vote custom-tooltip" @click="upvote(review.id,$event)">
                                  <b-spinner :id="`upvote-spinner-`+review.id" class="spinner  d-none"/>
                                  <img :id="`upvote-icon-`+review.id" src="@/assets/images/upvote.svg" alt="Up Vote">
                                  <span :id="`upvote-`+review.id">{{ review.upvotes }}</span>
                                  <span  v-if="!checkUserWallet()"  class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can upvote</span>
                                </div>
                              </div>
                              <div class="col-auto my-auto">
                                <div class="activity-card__footer-vote custom-tooltip" @click="downvote(review.id,$event)">
                                  <b-spinner :id="`downvote-spinner-`+review.id" class="spinner d-none"/>
                                  <img  :id="`downvote-icon-`+review.id"  src="@/assets/images/downvote.svg" alt="Down Vote">
                                  <span :id="`downvote-`+review.id">{{ review.downvotes }}</span>
                                  <span  v-if="!checkUserWallet()"  class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can downvote</span>
                                </div>
                              </div>
                              <div v-if="review.VerifiedBy!=null" class="col-auto text-right">
                                <span class="text-muted">Review verified by <img src="@/assets/images/barpay-logo-white.png" height="30px"/></span>
                              </div>
                              <div class="col text-right">
                                <span v-if="review.verifiedInfo!=null" class="text-muted">Review verified by <img src="@/assets/images/barpay-logo-white.png" height="30px"/></span>
                                <div v-if="review.user==profile.id" class="custom-tooltip">
                                  <font-awesome-icon v-on:click="deleteReview(review.id)"
                                                     style="color:#FF9800;font-size: 24px;"
                                                     class="mx-2" :icon="['far', 'trash-alt']"></font-awesome-icon>
                                  <span v-if="!checkUserWallet()" class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can delete a review</span>
                                </div>
                                <div v-if="review.user==profile.id" class="custom-tooltip">
                                  <font-awesome-icon v-on:click="editReview(review.placeID,place.name,review.id)"
                                                     style="color:#FF9800;font-size: 24px;" class="mx-2"
                                                     :icon="['far', 'pen']"></font-awesome-icon>
                                  <span v-if="!checkUserWallet()" class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can edit a review</span>
                                </div>

                                <div v-if="review.user!=profile.id" class="earns custom-tooltip ml-1">
                                  <Tip :tip-status="tipStatus" @onSubmit="onSubmit" :user-id="review.user" :review-id="review.id"></Tip>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="activity-card__purchase-btn" v-if="review.paywall && review.paywall.cost != 0 && review.user != profile.id && !review.paywall.paidFor">
                        <b-spinner :id="`purchase-spinner-`+review.id" class="spinner d-none"/>
                        <button :id="`purchase-button-`+review.id" class="btn btn-secondary" @click="purchaseReview(review.id)">Purchase ${{ review.paywall.cost }}</button>
                      </div>
                    </div>
                    <div class="load-more" ref="show-more-reviews" :class="{'d-none': showReviews > reviews.length}"
                         v-on:click="showMoreReviews()">
                      <img src="@/assets/images/arrow_down.svg" alt="Show More ReviewsService">
                      <p>Show More ReviewsService</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4 place-detail__info">
                <div class="row">
                  <div class="col-12">
                    <div class="place-detail__info-address mb-3">
                      <b>Address</b>
                      <p>{{ place.formatted_address }}</p>
                    </div>
                    <div class="place-detail__info-website mb-3">
                      <a :href="place.website" target="_blank">
                        {{ place.name }} website
                      </a>
                    </div>
                    <div class="place-detail__info-phone mb-3">
                      <b>Phone</b>
                      <p>{{ place.international_phone_number }}</p>
                    </div>
                    <div class="place-detail__info-schedule mb-3">
                      <div class="place-detail__info-schedule-days">
                        <!--start accordion-->
                        <div v-if="typeof place.opening_hours !='undefined'" class="accordion w-100" role="tablist">
                          <b-card no-body class="mb-1 border-0">
                            <b-card-header header-tag="header" class="px-0 py-1 border-0" role="tab"
                                           style="background-color: transparent">
                              <!--<b-button block v-b-toggle.accordion-1 variant="info">Accordion 1</b-button>-->
                              <div v-b-toggle.accordion-1 variant="info" style="outline: 0;">
                                <div class="row">
                                  <div class="col">
                                    <b class="schedule-header text-success" v-if="place.opening_hours.open_now==true">Open now<span> until {{ closingTime() }}</span>
                                    </b>
                                    <b class="schedule-header text-danger" v-else>Closed now</b>
                                  </div>
                                  <div class="col-auto">
                                    <font-awesome-icon class="text-right" :icon="['fas', 'chevron-down']"/>
                                  </div>
                                </div>

                              </div>
                            </b-card-header>
                            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                              <b-card-body class="px-0 py-1">
                                <b-card-text>
                                  <div class="" v-for="item in place.opening_hours.weekday_text" :key="item.index">
                                    <p class="time">{{ item }}</p>
                                  </div>
                                </b-card-text>
                              </b-card-body>
                            </b-collapse>
                          </b-card>
                        </div>
                        <!--end accordion-->
                      </div>
                    </div>
                    <div class="place-detail__info-photos">
                      <div v-if="typeof place.britevue_photos != 'undefined' && place.britevue_photos != null" class="row mx-n1">
                        <div class="place-detail__info-photos-item col-4 px-1 my-1" v-for="(photo, key) in place.britevue_photos.slice(0, 6)" :key="key">
                          <img  v-if="photo"
                                :src="photo.url"
                                @error="imageUrlAlt" alt="Card image cap"  @click="openImageModal(photo.url,key,'britevue')">
                          <img  v-else
                                src="@/assets/images/no-photo-avatar.png"
                                alt="Card image cap">
                          <span @click="goToPhotos()" class="img-overlay"
                                v-if="place.britevue_photos.length > 6 && key === 5">
                            <b class="img-text">+{{ place.britevue_photos.length - 6 }}</b>
                        </span>
                        </div>
                      </div>
                      <div v-if="typeof place.photos != 'undefined'" class="row mx-n1">
                        <div class="place-detail__info-photos-item col-4 px-1 my-1" v-for="(photo, key) in place.photos.slice(0, 6)" :key="key">
                          <img  v-if="photo"
                                :src="`https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyDMqrI8hMqiyIPdQUkRUerdohx28Fuv4wE&photo_reference=`+photo.photo_reference+`&maxwidth=300`"
                                @error="imageUrlAlt" alt="Card image cap" @click="openImageModal(photo.photo_reference,key,'google')">
                          <img  v-else
                                src="@/assets/images/no-photo-avatar.png"
                                alt="Card image cap">
                          <span @click="goToPhotos()" class="place-detail__info-photos-item-more" v-if="place.photos.length > 6 && key === 5">
                            +{{ place.photos.length - 6 }}
                        </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-3 px-0">
            <div class="find-places__map-wrapper">
              <div id="map" ref="map" class="find-places__map-sticky"></div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <Modal :show-handcash-modal="showHandcashModal"  :title="'Top Up!'" :body="'You need to reset your spending limit in the Handcash app'" :icon="'times-circle'" :actions="[{ text:'Open Handcash', url:'https://app.handcash.io/', variant:'handcash', target:'_blank' }]"></Modal>
          </div>
        </div>
      </div>
    </div>
    <div v-if="place">
      <div v-if="typeof place.photos != 'undefined'">
        <ImageModal v-if="place.photos && place.photos.length > 0" :source="'google'"  ref="PlaceImageModal" :show-image-modal="showGoogleImageModal" :main-image-model="mainImageModel" :main-image-index="mainImageIndex" :placeName="place.name" :imagesList="place.photos"></ImageModal>
      </div>
      <div v-if="typeof place.britevue_photos != 'undefined' ">
        <ImageModal v-if="place.britevue_photos && place.britevue_photos.length > 0" :source="'britevue'" :show-image-modal="showBritevueImageModal" :main-image-model="mainImageModel" :main-image-index="mainImageIndex" :placeName="place.name" :imagesList="place.britevue_photos"></ImageModal>
      </div>
    </div>
    <div>
      <ReviewImageModal @changeShowReviewImageModal="changeShowReviewImageModal" ref="reviewImageModal" :photos="reviewPhotos" :show-review-image-modal="showReviewImageModal" :main-review-image-model="mainReviewImageModel"></ReviewImageModal>
    </div>


    <Login ref="login" @openSignup="openSignup" @onLogin="onLogin"></Login>
    <Signup ref="signup" @onSignup="onSignup"></Signup>
  </div>
</template>
<style lang="scss" src="./Place.scss" scoped></style>
<script lang="ts">
import {Component, Inject, Vue} from "vue-property-decorator";
import {IGooglePlace} from "@/interfaces/IGooglePlace";
import {Loader, LoaderOptions} from "google-maps";

import Tip from "@/components/Tip/Tip.vue";
import {PlaceService} from "@/services/PlaceService";
import {ReviewsService} from "@/services/ReviewsService";
import {UserService} from "@/services/UserService";
import {IUser} from "@/interfaces/IUser";
import {FavoritesService} from "@/services/FavoritesService";
import Login from "@/components/Login/Login.vue";
import Signup from "@/components/Signup/Signup.vue";
import Modal from "@/components/Modal/Modal.vue";
import ImageModal from "@/components/ImageModal/ImageModal.vue";
import ReviewImageModal from  "@/components/ImageModal/ReviewImageModal.vue";

@Component({
  components: {
    Login,
    Signup,
    Tip,
    Modal,
    ImageModal,
    ReviewImageModal
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
export default class Place extends Vue {
  place_id: string;
  place: IGooglePlace | null;

  @Inject('favoritesService')
  favorites_ser!: FavoritesService;

  @Inject('placeService')
  place_ser!: PlaceService;

  @Inject('reviewsService')
  reviews_ser!: ReviewsService;
  reviews = [];
  showReviews: number;
  @Inject('userService')
  user_service!: UserService;
  profile: IUser | null = null;
  files: File[] = [];
  step: number;
  uploadProgress: number;
  showUploadProgressBar: boolean;
  options: any;
  flash: any;
  tipStatus: boolean;
  loadingReviews: boolean;
  loadingPlace: boolean;
  isFavorite: boolean;
  showHandcashModal: boolean;
  showGoogleImageModal: boolean;
  showBritevueImageModal: boolean;
  mainImageModel: string;
  mainImageIndex: number;
  reviewPhotos: [];
  showReviewImageModal: boolean;
  mainReviewImageModel: string;


  constructor() {
    super();
    this.place_id = '';
    this.showReviews = 6;
    if (typeof this.$route.params.id != 'undefined') {
      this.place_id = this.$route.params.id;
    } else {
      this.$router.push({name: "dashboard"});
    }
    this.place = null;
    this.step = 0;
    this.uploadProgress = 0;
    this.showUploadProgressBar = false;
    this.loadingReviews = true;
    this.loadingPlace = true
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

    this.user_service.updateUserLocalStorage("")
    const user = this.user_service.getCurrentUser();
    if (user) {
      this.profile = user;
      //check user token is expired
      const checkUser = this.user_service.getUser(this.profile.id);
    }
    this.tipStatus=false;
    this.isFavorite=false;
    this.showHandcashModal=false;
    this.showGoogleImageModal=false;
    this.showBritevueImageModal=false;
    this.mainImageModel= '';
    this.mainImageIndex=0;
    this.reviewPhotos=[];
    this.showReviewImageModal=false;
    this.mainReviewImageModel='';
  }


  async mounted() {
    if (this.$route.query.token != null && this.$route.query.username != null) {
      const tokenObj = {
        username: this.$route.query.username,
        token: this.$route.query.token,
        expires_at: this.$route.query.expires_at
      }
      localStorage.setItem('token', JSON.stringify(tokenObj))
      await this.user_service.updateUserLocalStorage(this.$route.query.username as string)
    } else {
      await this.user_service.updateUserLocalStorage("");
    }
    try {
      this.loadingPlace = true
      await this.loadPlaceDetail();
      await this.loadMap();
      this.loadingPlace = false
      await this.loadReviews();
      await this.checkPlaceIsFavorite();
    } catch(e) {
      this.openLogin()
    }
  }

  async deleteReview(review_id: string) {
    if (this.checkUserWallet()) {
      if(confirm('Are you sure you want to delete this review')){
        const deleteReview = await this.reviews_ser.deleteReview(review_id);
        if (deleteReview.status == 200) {
          this.reviews = []
          this.loadReviews()
        } else {
          this.flash("Had a problem deleting review", 'error', {timeout: 10000});
        }
      }
    }

  }

  async editReview(place_id: string, place_name: string, review_id: string) {
    if (this.checkUserWallet()) {
      this.getRoutePath('new_review', {'place_id': place_id, 'place_name': place_name, 'review_id': review_id});
    }
  }

  async loadPlaceDetail() {
    //check first if a place is a brite-vue place , if not fetch fetch from google
    const brite_place = await this.place_ser.getBriteLocation(this.place_id);
    if (brite_place.status == 200) {
      this.place = brite_place.data;
    } else {

      const google_place = await this.place_ser.getGoogleLocation(this.place_id);
      if (google_place.status==200) {
        this.place = google_place.data;
      }
      if(brite_place.status==500 && google_place.status==500){
        this.flash("Place Not Found", 'error', {timeout: 10000});
      }
    }
  }

  async loadMap() {
    const options: LoaderOptions = {/* todo */};
    const loader = new Loader('AIzaSyDMqrI8hMqiyIPdQUkRUerdohx28Fuv4wE', options);
    const google = await loader.load();
    /* eslint-disable @typescript-eslint/no-explicit-any*/
    const con: any = this.$refs.map;
    let lat = -34.397;
    let lng = 150.644;
    if (this.place != null && this.place.geometry != null && this.place.geometry.location != null) {
      lat = this.place.geometry.location.lat
      lng = this.place.geometry.location.lng
    }
    //load map
    new google.maps.Map(con, {
      center: {lat: lat, lng: lng},
      zoom: 15,
    });
  }

  tip(amount: string) {
    console.log('tipping:', amount);
  }

  goToPhotos() {
    this.getRoutePath('place_photos', {'place': this.place});
  }

  async loadReviews() {
    this.loadingReviews = true
    let reviews = await this.reviews_ser.getPlaceReviews(this.place_id);
    if (reviews.status==200) {
      reviews=reviews.data;
      let i;
      for(i=0;i<reviews.length;i++){
        const userInfo=await this.user_service.getUser(reviews[i].user);
        if (userInfo.status==200) {
          reviews[i].userInfo=userInfo.data;
        }
      }
      this.reviews = reviews;
    }
    this.loadingReviews = false
  }

  closingTime() {
    const dt = new Date();
    const dayOfTheWeek = dt.getDay();
    if (this.place == null || this.place.opening_hours == null || this.place.opening_hours.periods == null) {
      return ''
    }
    let hours;
    let minutes;
    let shift;
    if(this.place.opening_hours.open_now==true){
      if(this.place.opening_hours.periods.length==7){
        if(typeof this.place.opening_hours.periods[dayOfTheWeek].close.time!='undefined'){
          hours=this.place.opening_hours.periods[dayOfTheWeek].close.time.substring(0,2);
          minutes=this.place.opening_hours.periods[dayOfTheWeek].close.time.substring(2,4);
          shift='AM';
          if(hours > 12){
            hours-=12;
            shift='PM';
          }
          return hours+':'+minutes+' '+shift;
        }
      }else if(this.place.opening_hours.periods.count==1){
        if(typeof this.place.opening_hours.periods[0].close.time!='undefined'){
          hours=this.place.opening_hours.periods[0].close.time.substring(0,2);
          minutes=this.place.opening_hours.periods[0].close.time.substring(2,4);
          shift='AM';
          if(hours > 12){
            hours-=12;
            shift='PM';
          }
          return hours+':'+minutes+' '+shift;
        }
      }
    }

    return '';
  }

  imageUrlAlt(event: any) {
    event.target.src = require('@/assets/images/no-photo-avatar.png');
  }

  getRoutePath(name: string, parameters: any) {

    return this.$router.push({name: name, params: parameters});
  }

  sortReviews() {

    const sortReview = document.getElementById('sort-reviews') as HTMLInputElement;

    if (sortReview.value == 'name') {
      this.reviews.sort((n1: any, n2: any) => {
        if (n1.user > n2.user) {
          return 1;
        }

        if (n1.user < n2.user) {
          return -1;
        }

        return 0;
      });
    }
    if (sortReview.value == 'date') {
      this.reviews.sort((n1: any, n2: any) => {
        if (n1.timestamp > n2.timestamp) {
          return 1;
        }

        if (n1.timestamp < n2.timestamp) {
          return -1;
        }

        return 0;
      });
    }
  }

  showMoreReviews() {
    this.showReviews += 6;
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
      const res = await this.reviews_ser.upvoteReview(this.profile!.id, review_id);
      spinner.classList.add('d-none');
      upvoteElement.classList.remove('d-none');
      upvoteIcon.classList.remove('d-none');
      if (res.status == 200) {
        const upvoteResult = res.data
        if (typeof upvoteResult.txid != 'undefined') {
          const vote = upvoteElement!.textContent;
          upvoteElement!.innerHTML = (parseInt(vote!) + 1).toString();
          this.flash('Successfully upvoted review', 'success', {timeout: 5000})
        }
      } else if(res.status == 555) {
        this.showHandcashModal = true
      } else {
        const msg = res.data.message
        if (typeof msg != 'undefined') {
          this.flash(msg, 'error', {timeout: 5000})
        }
      }
    }
  }

  async purchaseReview(review_id: string) {
    const spinner=document.getElementById('purchase-spinner-' + review_id) as HTMLElement;
    const button=document.getElementById('purchase-button-' + review_id) as HTMLElement;
    if(this.checkUserWallet()){
      spinner.classList.remove('d-none');
      button.classList.add('d-none')
      const res = await this.reviews_ser.buyReview(review_id)
      if (res.status == 200) {
        this.flash('Successfully purchased review in tx '+res.data.paymentTx, 'success', {timeout: 5000});
      } else if (res.status == 555) {
        this.showHandcashModal = true
      } else {
        this.flash('Failed to purchase review', 'error', {timeout: 5000})
      }
      spinner.classList.add('d-none')
      await this.loadReviews()
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
      const res = await this.reviews_ser.downReview(this.profile!.id, review_id);
      spinner.classList.add('d-none');
      downvoteElement.classList.remove('d-none');
      downvoteIcon.classList.remove('d-none');
      if (res.status == 200) {
        const downvoteResult = res.data
        if (typeof downvoteResult.txid != 'undefined') {
          const vote = downvoteElement!.textContent;
          downvoteElement!.innerHTML = (parseInt(vote!) + 1).toString();
          this.flash('Successfully downvoted review', 'success', {timeout: 5000})
        }
      } else {
        const msg = res.data.message
        if (typeof msg != 'undefined') {
          this.flash(msg, 'error', {timeout: 5000})
        }
      }
    }
  }

  handleFileDrop(e: any) {
    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles) return;
    // this tip, convert FileList to array
    ([...droppedFiles]).forEach((f: any) => {
      this.files.push(f);
    });
    this.step = 2;
  }

  handleFileInput(e: any) {
    let files = e.target.files;
    files = e.target.files
    if (!files) return;
    // this tip, convert FileList to array
    ([...files]).forEach((f: File) => {
      this.files.push(f);
    });
    this.step = 2;
  }

  removeFile(fileKey: any) {
    this.files.splice(fileKey, 1)
  }

  async uploadImages() {
    this.step = 0;
    this.showUploadProgressBar = true;
    let i = 0;
    let status = false;
    const progress = 100 / (this.files.length);
    for (i = 0; i < this.files.length; i++) {
      //upload images
      const placeImage = await this.place_ser.uploadPlaceImage(this.files[i], this.place_id);
      if (placeImage.status != 200) {
        this.flash(placeImage['data']['message'], 'error', {timeout: 5000});
      }
      if (placeImage.status == 200) {
        status = true;
      }
      this.uploadProgress += parseInt(progress.toFixed(2));
    }
    this.showUploadProgressBar = false;
    if (status) {
      this.flash('Image has been uploaded', 'success', {timeout: 5000});
      location.reload();
    }
  }

  fileDragIn() {
    console.log('');
  }

  fileDragOut() {
    console.log('');
  }

  showImageUploader() {
    if (this.checkUserWallet()) {
      this.step = 1;
    }

  }
  copyToClipboard() {
    const dummy = document.createElement('input');
    const text = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    this.flash('Copied to clipboard', 'success', {timeout: 5000})
  }

  hideImageUploader() {
    this.step = 0;
    this.files = [];
  }

  createUrl(imageFile: File) {
    return window.URL.createObjectURL(imageFile);
  }

  async addFavoritePlace(place_id: any) {
    if (this.checkUserWallet()) {
      const add_favorite_place = await this.favorites_ser.addFavorite(this.profile!.id, 'location', place_id);
      if (add_favorite_place.status==200) {
        this.flash('Place has been added to your favorites', 'success', {timeout: 5000});
        this.checkPlaceIsFavorite()
      }
      if(add_favorite_place.status==409){
        this.flash('You have already added this place as a favorite', 'error', {timeout: 5000});
      }
    }
  }

  writeReview() {
    if (this.checkUserWallet()) {
      this.getRoutePath('new_review', {'place_id': this.place!.place_id, 'place_name': this.place!.name});
    }
  }

  checkUserWallet() {
    if (this.profile) {
      if (this.profile.wallet) {
        return true;
      } else {
        return false;
      }
    } else {
      this.openLogin();
    }
  }

  openLogin() {
    if (!(this.$refs['signup'] as any).isOpen()) {
      (this.$refs['login'] as any).showModal();
    }
  }

  openSignup() {
    (this.$refs['signup'] as any).showModal();
  }

  onLogin() {
    this.flash('You have logged in successfully', 'success', {timeout: 3000});
    location.reload();
  }

  onSignup() {
    this.flash('You have signed up successfuly', 'success', {timeout: 3000});
    location.reload();
  }
  async onSubmit(value: any,userId: any,reviewId: any ){
    const sendTip = await this.reviews_ser.sendTip(value,userId,reviewId);
    if (sendTip.status == 200) {
      this.flash('Your Tip has been sent successfully', 'success', {timeout: 5000});
      this.tipStatus=true;
    }else if(sendTip.status==555){
      this.showHandcashModal=true;
    }else{
      this.flash(sendTip.data.message, 'error', {timeout: 5000});
      this.tipStatus=false;
    }
  }
  async checkPlaceIsFavorite(){
    let favorite_places = await this.favorites_ser.places(this.profile!.id);
    if (favorite_places.status == 200) {
      favorite_places = favorite_places.data;
      const favorite_locations = new Array(favorite_places.length)
      if (favorite_places && favorite_places.length) {
        for (let i = 0; i < favorite_places.length; i++) {
          if(favorite_places[i].favorite==this.place_id){
            this.isFavorite=true;
          }
        }

      }
    }
  }

  openImageModal(photo_reference: any,index: number,source: string) {

    this.mainImageModel=photo_reference;
    this.mainImageIndex=index;
/*    this.$refs.PlaceImageModal.setImage(photo_reference);
    this.$refs.PlaceImageModal.setIndex(index);*/
    if(source=='google'){
      this.showGoogleImageModal = !this.showGoogleImageModal;
      this.showBritevueImageModal=false;
      this.showReviewImageModal=false;
    }else{
      this.showGoogleImageModal=false;
      this.showBritevueImageModal=!this.showBritevueImageModal;
      this.showReviewImageModal=false;
    }

  }
  openReviewImageModel(review_photos: any){
    this.reviewPhotos=review_photos;
    this.mainReviewImageModel=review_photos[0].url;
    this.showReviewImageModal=!this.showReviewImageModal;
    this.showGoogleImageModal=false;
    this.showBritevueImageModal=false;
}
  changeShowReviewImageModal(){
    this.showReviewImageModal=false;
  }
}
</script>
