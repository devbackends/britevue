<template>
  <div>
    <div class="alert-container">
      <flash-message class="myCustomClass"></flash-message>
    </div>
    <div v-if="profile" class="profile__container py-3 py-sm-5">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-lg-auto">
            <div class="pr-0 pr-lg-4">
              <div class="profile__user-image">
                <form id="customer_profile_picture_form" method="post" enctype='multipart/form-data'>
                  <div v-if="currentUser && profile.id==currentUser.id" class="profile__user-image-overlay">
                    <b-spinner v-if="userPhotoLoading"/>
                    <img v-else src="@/assets/images/user-image-add.svg" alt="">
                  </div>
                  <input v-if="currentUser && profile.id==currentUser.id" v-on:change="uploadProfilePicture($event)" name="image" type="file"
                         accept="image/x-png,image/gif,image/jpeg">
                  <img v-if="profile.profilePhoto.url == ''" src="@/assets/images/user-image-avatar.png" alt="">
                  <img v-else :src="profile.profilePhoto.url" :alt="profile.firstName">
                </form>
              </div>
              <div class="text-center mt-4">
                <b-button v-if="currentUser != null && profile.id==currentUser.id"  @click="showModal" variant="outline-primary">Edit Profile</b-button>
                <b-modal ref="modal-edit-profile" title="Update Profile Information" hide-footer>
                  <form v-on:submit="updateProfileForm($event)" id="profile_form">
                    <div class="form-group">
                      <label for="email">Email address:</label>
                      <input v-model="profile.email" required type="email" class="form-control"
                             placeholder="Enter email" id="email">
                      <label id="email_error" class="error d-none">This field is requierd</label>
                    </div>
                    <!--<div class="form-group">
                      <label for="password">Password:</label>
                      <input v-model="profile.password" required type="password" class="form-control"
                             placeholder="Enter Password" id="password">
                      <label id="password_error" class="error d-none">This field is requierd</label>
                    </div>-->
                    <div class="form-group">
                      <label for="first_name">First Name:</label>
                      <input v-model="profile.firstName" required type="text" class="form-control"
                             placeholder="First Name" id="first_name">
                      <label id="first_name_error" class="error d-none">This field is requierd</label>
                    </div>
                    <div class="form-group">
                      <label for="last_name">Last Name:</label>
                      <input v-model="profile.lastName" required type="text" class="form-control"
                             placeholder="Last Name" id="last_name">
                      <label id="last_name_error" class="error d-none">This field is requierd</label>
                    </div>
                    <b-button type="submit" variant="primary" @click="hideModal">Submit</b-button>
                  </form>
                </b-modal>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg">
            <div class="row profile__title">
              <div class="col-md-12">
                <h3 class="profile__title-name">{{ profile.firstName }}</h3>
                <p class="profile__title-location">{{ profile.location }}</p>
              </div>
            </div>
            <div class="row profile__info align-items-center">
              <div class="col-12 col-sm-3 mb-3 mb-sm-0">
                <div class="row no-gutters align-items-center profile__info-points">
                  <div class="col-auto profile__info-coin-icon">
                    <font-awesome-icon :icon="['far', 'coin']"/>
                  </div>
                  <div class="col-auto">
                    <p class="profile__info-earnings">{{ profile.earnings }}</p>
                  </div>
                  <div class="col-auto">
                    <p>Earned</p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-2 mb-3 mb-sm-0 profile__info-other">
                <p class="font-weight-bold">Reputation</p>
                <p>{{ profile.reputation }}</p>
              </div>
              <div class="col-12 col-sm profile__info-other">
                <p class="font-weight-bold">Paymail</p>
                <p>{{ profile.paymail }}</p>
                <p v-show="!profile.paymail" class="text-gray-500">No paymail</p>
              </div>
            </div>
            <div v-if="currentUser && profile.id==currentUser.id">
              <div v-if="step< 4 || reviews.length== 0 && !loadingReviews" class="profile__steps-container">
                <div class="profile__steps">
                  <div class="row align-items-center justify-content-center">
                    <div class="col-12 col-sm-auto">
                      <div class="steps__item"
                           :class="{'steps__item--success': step > 1, 'steps__item--active': step == 1}">
                        <p class="steps__item-title">Sign Up to Britevue</p>
                        <img v-show="step > 1" src="@/assets/images/check.svg" alt="" class="steps__item-check">
                      </div>
                    </div>
                    <div class="col-auto d-none d-sm-inline-block">
                      <span class="steps__item-chevron">
                        <font-awesome-icon :icon="['far', 'chevron-right']"/>
                      </span>
                    </div>
                    <div class="col-12 col-sm-auto">
                      <div class="steps__item"
                           :class="{'steps__item--success': step > 2, 'steps__item--active': step == 2}">
                        <p class="steps__item-title">Set Up Your Wallet</p>
                        <img v-show="step > 2" src="@/assets/images/check.svg" alt="" class="steps__item-check">
                      </div>
                    </div>
                    <div class="col-auto d-none d-sm-inline-block">
                      <span class="steps__item-chevron">
                        <font-awesome-icon :icon="['far', 'chevron-right']"/>
                      </span>
                    </div>
                    <div class="col-12 col-sm-auto">
                      <div class="steps__item"
                           :class="{'steps__item--success': step > 3, 'steps__item--active': step == 3}">
                        <p class="steps__item-title">Claim Your Free Cash</p>
                        <img v-show="step > 3" src="@/assets/images/check.svg" alt="" class="steps__item-check">
                      </div>
                    </div>
                    <div class="col-auto d-none d-sm-inline-block">
                      <span class="steps__item-chevron">
                        <font-awesome-icon :icon="['far', 'chevron-right']"/>
                      </span>
                    </div>
                    <div class="col-12 col-sm-auto">
                      <div class="steps__item" :class="{'steps__item--active': step == 4}">
                        <p class="steps__item-title">Write Your First Review</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="profile__steps-content">
                  <div v-show="step==1" id="step1" ref="step1"></div>
                  <div v-show="step==2" id="step2" ref="step2">
                    <div class="row align-items-center justify-content-center">
                      <div class="col-12 col-md-6 col-lg-4">
                        <h3 class="profile__steps-wallet-title">Connect your wallet to claim your free cash.</h3>
                      </div>
                      <div class="col-12 col-md-auto text-center">
                        <div class="profile__steps-handcash">
                          <p>Recommended</p>
                          <div id="connectButton" @click="redirectToHC">
                            Connect with HandCash
                          </div>
                          <!--<button type="button" @click="redirectToMB" class="btn btn-secondary signup-moneybutton">
                                                      <img src="@/assets/images/moneybutton_logo.svg" alt="">
                                                      Connect with Money Button
                                                    </button>-->
                        </div>
                        <!--
                        ** Other wallet providers. Currently only supporting MB and HC
                        <p class="other-options">Other Options</p>
                        <button class="btn btn-outline-dark">Handcash</button>
                        <button class="btn btn-outline-dark">DotWallet</button>
                        -->
                      </div>
                    </div>
                  </div>
                  <div v-show="step==3" id="step3" ref="step3" class="profile__steps-survey">
                    <div class="row">
                      <div class="col-12 col-md-5">
                        <h3 class="profile__steps-survey-title">Answer a quick survey about your hometown to get
                          started!</h3>
                        <p class="profile__steps-survey-text">
                          To ensure you have some money to get started on Britevue,
                          please take some time to answer a short survey on your
                          favorite local places! Each question is optional and any
                          responses will be automatically added to your favorites list!
                          Earn a little bit of money for each response.
                        </p>
                      </div>
                      <div class="col-12 col-md form-container">
                        <form>
                          <div class="form-group">
                            <label for="surveyLocalRestaurant">{{ this.surveyLocalRestaurantQuestion }}</label>
                            <vue-google-autocomplete
                                id="surveyLocalRestaurant"
                                class="form-control"
                                placeholder="Search"
                                v-bind:enable-geolocation=true
                                types="establishment"
                                v-on:placechanged="surveyLocalRestaurantChanged"
                            >
                            </vue-google-autocomplete>
                          </div>
                          <div class="form-group">
                            <label for="surveyPizzaPlace">{{ this.surveyPizzaPlaceQuestion }}</label>
                            <vue-google-autocomplete
                                id="surveyPizzaPlace"
                                class="form-control"
                                placeholder="Search"
                                v-bind:enable-geolocation=true
                                types="establishment"
                                v-on:placechanged="surveyPizzaPlaceChanged"
                            >
                            </vue-google-autocomplete>
                          </div>
                          <div class="form-group">
                            <label for="surveyBreakfastPlace">{{ this.surveyBreakfastPlaceQuestion }}</label>
                            <vue-google-autocomplete
                                id="surveyBreakfastPlace"
                                class="form-control"
                                placeholder="Search"
                                v-bind:enable-geolocation=true
                                types="establishment"
                                v-on:placechanged="surveyBreakfastPlaceChanged"
                            >
                            </vue-google-autocomplete>
                          </div>
                          <div class="form-group">
                            <label for="surveyMexicanRestaurant">{{ this.surveyMexicanRestaurantQuestion }}</label>
                            <vue-google-autocomplete
                                id="surveyMexicanRestaurant"
                                class="form-control"
                                placeholder="Search"
                                v-bind:enable-geolocation=true
                                types="establishment"
                                v-on:placechanged="surveyMexicanRestaurantChanged"
                            >
                            </vue-google-autocomplete>
                          </div>
                          <div class="form-group">
                            <label for="surveyCoffee">{{ this.surveyCoffeeQuestion }}</label>
                            <vue-google-autocomplete
                                id="surveyCoffee"
                                class="form-control"
                                placeholder="Search"
                                v-bind:enable-geolocation=true
                                types="establishment"
                                v-on:placechanged="surveyCoffeeChanged"
                            >
                            </vue-google-autocomplete>
                          </div>
                          <div v-if="submittingSurvey" class="d-flex justify-content-between pt-3">
                            <b-spinner class="spinner"/>
                          </div>
                          <div v-else class="d-flex justify-content-between pt-3">
                            <button type="button" class="btn btn-primary" @click="submitOnboardingSurvey">Submit
                            </button>
                            <button type="reset" class="btn btn-outline-gray-700" @click="skipSurvey">Skip for now
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div v-show="step==4" id="step4" ref="step4" class="profile__steps-thanks">
                    <div>
                      <p class="profile__steps-thanks-title"><span>Thanks for taking the survey!</span> You now have some
                        money to get started writing.</p>
                    </div>
                    <div class=" row align-items-center justify-content-center">
                      <div class="col-12 col-md-auto mb-3 mb-sm-0">
                        <font-awesome-layers full-width class="fa-3x">
                          <font-awesome-icon :icon="['fal', 'map-marked-alt']"/>
                        </font-awesome-layers>
                      </div>
                      <div class="col-12 col-md-6 mb-3 mb-sm-0">
                        <p class="profile__steps-thanks-write">Find a place where you have been and write a review that
                          will help others</p>
                      </div>
                      <div class="col-12 col-md-auto">
                        <div class="custom-tooltip">
                          <button v-on:click="getRoutePath('dashboard','')" type="button" class="btn btn-primary btn-lg">
                            Write a review now
                          </button>
                          <span v-if="!checkUserWallet()" class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can write a review</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="row" >
              <div class="col-12 col-md-8">
                <div v-if="currentUser && profile.id==currentUser.id" class="profile__notifications mb-5">
                  <div class="mb-3">
                    <h4 class="profile__notifications-title">Notifications</h4>
                    <button v-on:click="clearNotifications()"
                            class="btn btn-outline-primary profile__notifications-clear">Clear All
                    </button>
                  </div>
                  <template v-if="notifications.length">
                    <div class="row">
                      <div  class="col-12" v-for="(notification, index) in notifications" :key="notification.id">
                        <div class="row no-gutters"
                             :class="notifications.length === index +1? 'notification last': 'notification'">
                          <div class="col-7">
                            <p class="content">
                              <span class="icon"><img src="@/assets/images/activities_grey.svg"
                                                      alt="Notification"></span>
                              {{ notification }}
                            </p>
                          </div>
                          <div class="col-12">
                            <span class="divider"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <div class="row">
                    <div class="col-12" v-if="!notifications.length">
                      <p>No Notifications were found.</p>
                    </div>
                  </div>
                </div>
                <div class="profile__reviews mb-5">
                  <div v-if="loadingReviews" class="row justify-content-center spinner">
                    <b-spinner/>
                  </div>
                  <div v-else class="profile__reviews-list">
                    <div v-if="reviews != null">
                      <h4 class="mb-4">Reviews</h4>

                      <div class="activity-card" v-for="review in reviews.slice(0,showReviews)" :key="review.id">
                        <div class="row no-gutters">
                          <div v-if="typeof review.photos != 'undefined' && review.photos != null "
                               class="col-12 col-sm-auto pr-0 pr-sm-3 mb-3 mb-sm-0">
                            <div v-if="review.photos.length > 0">
                              <img @click="openReviewImageModel(review.photos)" :src="review.photos[0].url" alt="Place"
                                   class="activity-card__header-horizontal-image">
                            </div>
                          </div>
                          <div class="col-12 col-sm">
                            <div class="activity-card__header">
                              <div class="row align-items-center">
                                <div class="col">
                                  <p class="activity-card__header-name"
                                     @click="getRoutePath('place',{'id':review.placeID})">{{ review.title }}</p>
                                  <p class="activity-card__header-date">{{ review.date }}</p>
                                </div>
                              </div>
                            </div>
                            <div class="activity-card__body">
                              <div class="row">
                                <div class="col">
                                  <div class="place-card__rating">
                                    <img src="@/assets/images/star.svg" alt="Rating"/>
                                    <p>
                                      <span class="place-card__rating-value">{{ review.ratingAverage }}</span>
                                    </p>
                                  </div>
                                </div>
                                <div class="col text-right">
                                  <p><strong>Score: {{review.score }}</strong></p>
                                </div>
                              </div>
                              <div class="row" v-if="review.paywall && review.paywall.cost != 0">
                                <div class="col text-right">
                                  <p><strong>Cost: ${{ review.paywall.cost }}</strong></p>
                                </div>
                              </div>
                              <p class="card-text" :class="review.paywall && review.paywall.cost != 0 && review.user != currentUser.id && !review.paywall.paidFor ? 'blur' : ''">{{ review.reviewBody }}</p>
                              <!--<p class="user-rep">User Rep: &lt;!&ndash;{{ activity.user.reputation }}&ndash;&gt;</p>-->
                            </div>
                            <div class="activity-card__footer">
                              <div class="row">
                                <div class="col-auto pr-0">
                                  <div class="activity-card__footer-vote custom-tooltip" @click="upvote(review.id,$event)">
                                    <b-spinner :id="`upvote-spinner-`+review.id" class="spinner  d-none"/>
                                    <img :id="`upvote-icon-`+review.id" src="@/assets/images/upvote.svg" alt="Up Vote">
                                    <span :id="`upvote-`+review.id">{{ review.upvotes }}</span>
                                    <span v-if="!checkUserWallet()" class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can upvote</span>
                                  </div>
                                </div>
                                <div class="col-auto pr-0">
                                  <div class="activity-card__footer-vote custom-tooltip" @click="downvote(review.id,$event)">
                                    <b-spinner :id="`downvote-spinner-`+review.id" class="spinner  d-none"/>
                                    <img :id="`downvote-icon-`+review.id" src="@/assets/images/downvote.svg" alt="Down Vote">
                                    <span :id="`downvote-`+review.id">{{ review.downvotes }}</span>
                                    <span v-if="!checkUserWallet()" class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can downvote</span>
                                  </div>
                                </div>
                                <div class="col text-right">

                                  <div v-if="currentUser && profile.id==currentUser.id" class="custom-tooltip">
                                    <font-awesome-icon v-on:click="deleteReview(review.id)"
                                                       style="color:#FF9800;font-size: 24px;"
                                                       class="mx-2" :icon="['far', 'trash-alt']"></font-awesome-icon>
                                    <span v-if="!checkUserWallet()" class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can delete a review</span>
                                  </div>
                                  <div v-if="currentUser && profile.id==currentUser.id" class="custom-tooltip">
                                    <font-awesome-icon v-on:click="editReview(review.placeID,review.title,review.id)"
                                                       style="color:#FF9800;font-size: 24px;" class="mx-2"
                                                       :icon="['far', 'pen']"></font-awesome-icon>
                                    <span v-if="!checkUserWallet()" class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can edit a review</span>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="activity-card__purchase-btn" v-if="review.paywall && review.paywall.cost != 0 && review.user != currentUser.id && !review.paywall.paidFor">
                          <b-spinner :id="`purchase-spinner-`+review.id" class="spinner d-none"/>
                          <button :id="`purchase-button-`+review.id" class="btn btn-secondary" @click="purchaseReview(review.id)">Purchase ${{ review.paywall.cost }}</button>
                        </div>
                      </div>
                    </div>

                    <p v-if="reviews == null">You don't have any reviews yet.</p>

                    <div v-if="reviews != null" class="text-center">
                      <div class="profile__reviews-list-load-more" :class="{'d-none': showReviews > reviews.length}"
                           v-on:click="showMoreReviews()">
                        <img src="@/assets/images/arrow_down.svg" alt="Show More Reviews">
                        <p>Show More Reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <!--<div class="profile__side-reviewers">
                  <p class="profile__side-title">My Favorite Reviewers</p>
                  <div class="profile__side-reviewers-list" v-if="favorite_users.length">
                    <div class="side-info-item" v-for="(person, index) in favorite_users" :key="person.id"
                         :class="favorite_users.length === index +1? 'last': ''">
                      <div class="row align-items-center">
                        <div class="col-auto pr-0">
                          <img v-if="person.profilePhoto.url!=''" class="side-info-item__image"
                               :src="person.profilePhoto.url"
                               :alt="person.firstName">
                          <img v-else class="side-info-item__image" src="@/assets/images/person.png"
                               :alt="person.firstName">
                        </div>
                        <div class="col">
                          <p class="side-info-item__name">{{ person.firstName + " " + person.lastName }}</p>
                          <p v-if="person.reviewsCount > 1" class="side-info-item__info">{{ person.reviewsCount }}
                            Reviews</p>
                          <p v-else class="side-info-item__info">{{ person.reviewsCount }} Review</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p v-if="!favorite_users.length">No Favorite Reviewers were found.</p>
                </div>-->
                <div class="profile__side-places">
                  <p class="profile__side-title"><span v-if="currentUser && profile.id==currentUser.id" >My </span>Favorite Places</p>
                  <div class="profile__side-places-list" v-if="favorite_locations.length">
                    <div class="side-info-item" v-for="(place, index) in favorite_locations" :key="place.id"
                         :class="favorite_locations.length === index +1? 'last': ''">
                      <div class="row align-items-center">
                        <div v-if="typeof place.britevue_photos !='undefined' && place.britevue_photos != null"
                             class="col-auto pr-0">
                          <img v-if="place.britevue_photos.length > 0" :src="place.britevue_photos[0].url"
                               :alt="place.title" class="side-info-item__image">
                          <img v-else class="side-info-item__image" src="@/assets/images/no-photo-avatar-1.png"
                               :alt="place.title">
                        </div>
                        <div v-else class="col-auto pr-0">
                          <img v-if="typeof place.photos !='undefined' && place.photos != null"
                               :src="`https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyDMqrI8hMqiyIPdQUkRUerdohx28Fuv4wE&photo_reference=`+place.photos[0].photo_reference+`&maxwidth=50`"
                               @error="imageUrlAlt" alt="Card image cap" class="side-info-item__image">
                          <img v-else class="side-info-item__image" src="@/assets/images/no-photo-avatar-1.png"
                               :alt="place.title">
                        </div>
                        <div class="col">
                          <a
                              v-on:click="getRoutePath('place', { id: place.place_id })"
                              href="javascript:;"
                              class="place-card__title"
                          >
                            <p class="side-info-item__name">{{ place.name }}</p>
                          </a>
                          <div class="row no-gutters">
                            <div class="col">
                              <p class="side-info-item__info">{{ place.formatted_address }}</p>
                            </div>
                            <div class="col text-right">
                              <div v-if="place.review_total > 0" class="side-info-item__rating">
                                <img src="@/assets/images/star.svg" alt="Rating">
                                <span>{{ place.britevue_ratings.average }}</span><span
                                  class="side-info-item__rating-count">({{ place.review_total }})</span>
                              </div>
                              <div v-else class="side-info-item__rating">
                                <img src="@/assets/images/star.svg" alt="Rating">
                                <span>N/A</span><span class="side-info-item__rating-count">({{
                                  place.review_total
                                }})</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <p v-if="!favorite_locations.length">No Favorite Places were found.</p>
                </div>
              </div>
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
    <div>
      <ReviewImageModal @changeShowReviewImageModal="changeShowReviewImageModal" ref="reviewImageModal"
                        :photos="reviewPhotos" :show-review-image-modal="showReviewImageModal"
                        :main-review-image-model="mainReviewImageModel"></ReviewImageModal>
    </div>
    <Login ref="login" @openSignup="openSignup" @onLogin="onLogin"></Login>
    <Signup ref="signup" @onSignup="onSignup"></Signup>
  </div>
</template>

<style lang="scss" src="./Profile.scss"></style>
<script lang="ts">
import {Vue, Component, Inject} from 'vue-property-decorator';
import {IReview} from "@/interfaces/IReview";
import {INotification} from "@/interfaces/INotification";
import {ISurvey} from "@/interfaces/ISurvey";
import {IUser} from "@/interfaces/IUser";
import {IPlace} from "@/interfaces/IPlace";
import {IFavorite} from "@/interfaces/IFavorite";
import {ReviewsService} from "@/services/ReviewsService";
import {FavoritesService} from "@/services/FavoritesService";
import {UserService} from "@/services/UserService";
import {PlaceService} from "@/services/PlaceService";
import {GoogleService} from "@/services/GoogleService";
import {SurveyService} from "@/services/SurveyService";
import Login from "@/components/Login/Login.vue";
import Signup from "@/components/Signup/Signup.vue";
import Modal from "@/components/Modal/Modal.vue";
import VueGoogleAutocomplete from "vue-google-autocomplete"
import "./Handcash.css";
import {NotificationsService} from "@/services/NotficationsService";
import ReviewImageModal from "@/components/ImageModal/ReviewImageModal.vue";

const HandcashAppID = process.env.VUE_APP_HC_APP_ID
const MoneybuttonAppID = process.env.VUE_APP_MB_APP_ID
const MoneybuttonRedirectURI = process.env.VUE_APP_MB_REDIRECT_URI
@Component({
  components: {
    Login,
    Signup,
    Modal,
    VueGoogleAutocomplete,
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
export default class Profile extends Vue {
  @Inject('userService')
  user_service!: UserService;

  loadingReviews = false
  step: number;
  profile: IUser | null = null;
  profile_id!: string;
  currentUser: IUser | null = null;
  notifications: INotification[] = [];
  favorite_reviewers: IFavorite[] = [];
  favorite_places: IFavorite[] = [];
  favorite_user!: IUser;
  favorite_users: IUser[] = [];
  favorite_location!: IPlace;
  favorite_locations: IPlace[] = [];
  reviews: IReview[] = [];
  @Inject('reviewsService')
  reviews_ser!: ReviewsService;

  @Inject('placeService')
  place_ser!: PlaceService;

  @Inject('favoritesService')
  favorites_ser!: FavoritesService;

  @Inject('googleService')
  google_ser!: GoogleService;
  showReviews: number;

  @Inject('surveyService')
  survey_ser!: SurveyService;

  @Inject('notificationsService')
  notification_service!: NotificationsService;

  // Onboarding survey vars
  surveyLocalRestaurantQuestion: string;
  surveyLocalRestaurant: string;
  surveyMexicanRestaurantQuestion: string;
  surveyMexicanRestaurant: string;
  surveyPizzaPlaceQuestion: string;
  surveyPizzaPlace: string;
  surveyBreakfastPlaceQuestion: string;
  surveyBreakfastPlace: string;
  surveyCoffeeQuestion: string;
  surveyCoffee: string;

  onboardingSurvey!: ISurvey;
  flash: any;
  userPhotoLoading: boolean;
  submittingSurvey: boolean;
  reviewPhotos: [];
  showReviewImageModal: boolean;
  mainReviewImageModel: string;

  showHandcashModal: boolean;

  constructor() {
    super();
    if (typeof this.$route.params.id != 'undefined') {
      this.profile_id = this.$route.params.id;
    } else {
     // this.getRoutePath('home', '');
    }
    this.step = 2;
    this.showReviews = 6;
    // onboarding survey
    this.submittingSurvey = false;
    this.surveyLocalRestaurantQuestion = "What's your favorite restaurant?";
    this.surveyLocalRestaurant = "";
    this.surveyMexicanRestaurantQuestion = "What's your favorite Mexican restaurant?";
    this.surveyMexicanRestaurant = "";
    this.surveyPizzaPlaceQuestion = "What's your favorite pizza place?";
    this.surveyPizzaPlace = "";
    this.surveyBreakfastPlaceQuestion = "What's your favorite place to get breakfast?";
    this.surveyBreakfastPlace = "";
    this.surveyCoffeeQuestion = "What's your favorite coffee shop?";
    this.surveyCoffee = "";
    this.notifications = [];
    this.showHandcashModal = false;
    this.userPhotoLoading = false;
    this.reviewPhotos = [];
    this.showReviewImageModal = false;
    this.mainReviewImageModel = '';
    const user = this.user_service.getCurrentUser();
    if (user) {
      this.currentUser = user;
    }
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
      const fetchUser = await this.user_service.getUser(this.profile_id);
      if (fetchUser.status == 200) {
        await this.getUserNotification();
        this.profile = fetchUser.data;
        if (this.profile!.wallet != '') {
          this.step = 3;
        }
        if (this.profile!.onboardingSurveyDone == true) {
          this.step = 4;
        }

        this.allUserReviews();
        await this.loadFavoriteLocations();

        let favorite_reviewers = await this.favorites_ser.reviewers(this.profile!.id);
        if (favorite_reviewers.status == 200) {
          favorite_reviewers = favorite_reviewers.data;
          const favorite_users = new Array(favorite_reviewers.length)
          if (favorite_reviewers && favorite_reviewers.length) {
            this.favorite_reviewers = favorite_reviewers;
            for (let i = 0; i < favorite_reviewers.length; i++) {
              const favorite_user = await this.user_service.getUser(favorite_reviewers[i].favorite);
              if (favorite_user.status == 200) {
                this.favorite_user = favorite_user.data;
                favorite_users[i] = favorite_user.data;
              }
 
            }
            this.favorite_users = favorite_users;
          }

        }


      } else {
      //  this.getRoutePath('home', '');
      }
    } catch(e) {
      console.error(e)
      this.openLogin()
    }
  }

  surveyLocalRestaurantChanged(ret: any, place: any, id: any) {
    if (typeof place.place_id != "undefined") {
      this.surveyLocalRestaurant = place.place_id
    }
  }

  openLogin() {
    if (!(this.$refs['signup'] as any).isOpen()) {
      (this.$refs['login'] as any).showModal();
    }
  }

  onLogin() {
    this.flash('You have logged in successfully', 'success', {timeout: 3000});
    location.reload();
  }
  onSignup() {
    this.flash('You have signed up successfully', 'success', {timeout: 3000});
    location.reload();
  }
  openSignup() {
    (this.$refs['signup'] as any).showModal();
  }
  surveyPizzaPlaceChanged(ret: any, place: any, id: any) {
    if (typeof place.place_id != "undefined") {
      this.surveyPizzaPlace = place.place_id
    }
  }

  surveyCoffeeChanged(ret: any, place: any, id: any) {
    if (typeof place.place_id != "undefined") {
      this.surveyCoffee = place.place_id
    }
  }

  surveyBreakfastPlaceChanged(ret: any, place: any, id: any) {
    if (typeof place.place_id != "undefined") {
      this.surveyBreakfastPlace = place.place_id
    }
  }

  surveyMexicanRestaurantChanged(ret: any, place: any, id: any) {
    if (typeof place.place_id != "undefined") {
      this.surveyMexicanRestaurant = place.place_id
    }
  }

  imageUrlAlt(event: any) {
    event.target.src = require("@/assets/images/no-photo-avatar.png");
  }

  showModal() {
    (this.$refs['modal-edit-profile'] as any).show();
  }

  hideModal() {
    (this.$refs['modal-edit-profile'] as any).hide();
  }


  skipSurvey() {
    this.step = 4
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
      await this.allUserReviews()
    }
  }

  async loadFavoriteLocations() {
    if (this.profile) {
      let favorite_places = await this.favorites_ser.places(this.profile.id);

      const favorite_locations = new Array(favorite_places.length)
      if (favorite_places.status == 200) {
        favorite_places = favorite_places.data;
        if (favorite_places && favorite_places.length) {
          this.favorite_places = favorite_places;
          for (let i = 0; i < favorite_places.length; i++) {
            const favorite_location = await this.place_ser.getPlace(favorite_places[i].favorite);
            this.favorite_location = favorite_location;
            favorite_locations[i] = favorite_location;
          }

          this.favorite_locations = favorite_locations;
        }
      }
    }
  }

  async allUserReviews() {
    this.reviews = [];
    this.loadingReviews = true
    const reviews = await this.reviews_ser.allUserReviews(this.profile!.id);
    if (reviews.status == 200) {
      this.reviews = reviews.data;
      if (this.reviews != null) {
        await this.loadReviewLocations()
      }

    }
    this.loadingReviews = false
  }

  async loadReviewLocations() {
    const revs = []
    for (let i = 0; i < this.reviews.length; i++) {
      const rev = this.reviews[i];
      if (rev.placeID == null) {
        continue
      }
      try {
        const place = await this.place_ser.getPlace(rev.placeID)
        rev.title = place.name
        revs.push(rev)
      } catch (e) {
        console.error(e);
      }
    }
    this.reviews = revs
    this.loadingReviews = false
  }

  async submitOnboardingSurvey() {
    const surveyResponses = []
    let response = {
      question: "",
      answer: ""
    }
    if (this.surveyLocalRestaurant != "") {
      response = {
        question: this.surveyLocalRestaurantQuestion,
        answer: this.surveyLocalRestaurant
      }
      surveyResponses.push(response)
    }
    if (this.surveyMexicanRestaurant != "") {
      response = {
        question: this.surveyMexicanRestaurantQuestion,
        answer: this.surveyMexicanRestaurant
      }
      surveyResponses.push(response)
    }
    if (this.surveyBreakfastPlace != "") {
      response = {
        question: this.surveyBreakfastPlaceQuestion,
        answer: this.surveyBreakfastPlace
      }
      surveyResponses.push(response)
    }
    if (this.surveyCoffee != "") {
      response = {
        question: this.surveyCoffeeQuestion,
        answer: this.surveyCoffee
      }
      surveyResponses.push(response)
    }
    if (this.surveyPizzaPlace != "") {
      response = {
        question: this.surveyPizzaPlaceQuestion,
        answer: this.surveyPizzaPlace
      }
      surveyResponses.push(response)
    }
    if (this.profile == null) {
      return
    }
    if (surveyResponses.length == 0) {
      this.flash('Please include at least one survey response or skip the survey', 'error', {timeout: 10000})
      return
    }
    this.onboardingSurvey = {
      id: "1",
      username: this.profile.id,
      responses: surveyResponses
    }

    this.submittingSurvey = true

    const survey_res = await this.survey_ser.postSurvey(this.onboardingSurvey)
    if (survey_res.status == 200) {
      this.flash('Successfully submitted survey response! You were paid ' + survey_res.data.totalEarnings + ' cents in transaction ' + survey_res.data.paymentTx, 'success', {timeout: 10000});
      this.profile.earnings = survey_res.data.totalEarnings
      this.submittingSurvey = false
      this.loadFavoriteLocations()
      this.step = 4
    } else {
      this.flash('Something went wrong', 'error', {timeout: 10000});
      this.submittingSurvey = false
    }

  }

  redirectToHC() {
    if (this.profile != null) {
      this.$cookies.set('username', this.profile.id)
    }
    window.location.href = 'https://app.handcash.io/#/authorizeApp?appId=' + HandcashAppID
  }

  generateState() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getRoutePath(name: string, parameters: any) {
    return this.$router.push({name: name, params: parameters});
  }

  async upvote(review_id: string, e: any) {
    e.preventDefault();
    if (this.checkUserWallet()) {
      const spinner=document.getElementById('upvote-spinner-' + review_id) as HTMLElement;
      const upvoteElement=document.getElementById('upvote-' + review_id) as HTMLElement;
      const upvoteIcon=document.getElementById('upvote-icon-' + review_id) as HTMLElement;
      spinner.classList.remove('d-none');
      upvoteElement.classList.add('d-none');
      upvoteIcon.classList.add('d-none');
      const res = await this.reviews_ser.upvoteReview(this.currentUser!.id, review_id);
      spinner.classList.add('d-none');
      upvoteElement.classList.remove('d-none');
      upvoteIcon.classList.remove('d-none');
      if (res.status == 200) {
        const upvoteResult = res.data
        const vote = document.getElementById('upvote-' + review_id)!.textContent;
        document.getElementById('upvote-' + review_id)!.innerHTML = (parseInt(vote!) + 1).toString();
        this.flash('Successfully upvoted review', 'success', {timeout: 5000})
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

  async downvote(review_id: string, e: any) {
    e.preventDefault();
    if (this.checkUserWallet()) {
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
        const vote = document.getElementById('downvote-' + review_id)!.textContent;
        document.getElementById('downvote-' + review_id)!.innerHTML = (parseInt(vote!) - 1).toString();
        this.flash('Successfully downvoted review', 'success', {timeout: 5000})
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

  async uploadProfilePicture(event: any) {
    // Reference to the DOM input element
    const input = event.target;
    if (input.files && input.files[0]) {
      const fileType = input.files[0]["type"];
      const validImageTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        const photo = event.target.files[0] as File;
        const upload_user_photo = await this.user_service.uploadUserPhoto(photo, this.profile!.id);
        if (upload_user_photo) {
          this.userPhotoLoading = true;
          await this.user_service.updateUserLocalStorage(this.profile!.id);
          this.flash('Updated profile picture', 'success', {timeout: 5000});
          this.userPhotoLoading = false;
          location.reload();
        }
      } else {
        this.flash('Please try to upload a valid image', 'error', {timeout: 5000});
      }
    }
  }

  showMoreReviews() {
    this.showReviews += 6;
  }

  async tokenExpired() {
    await this.user_service.logout();
    this.$router.push({name: "home"});
  }

  async deleteReview(review_id: string) {
    if (this.checkUserWallet()) {
      if (confirm('Are you sure you want to delete this review')) {
        const deleteReview = await this.reviews_ser.deleteReview(review_id);
        if (deleteReview.status == 200) {
          this.allUserReviews();
        } else {
          this.flash('Failed to delete review', 'error', {timeout: 5000});
        }
      }
    }

  }

  async editReview(place_id: string, place_name: string, review_id: string) {
    if (this.checkUserWallet()) {
      this.getRoutePath('new_review', {'place_id': place_id, 'place_name': place_name, 'review_id': review_id});
    }
  }

  checkUserWallet() {
    if (this.currentUser) {
      if (this.currentUser.wallet) {
        return true;
      } else {
        return false;
      }
    } else {
      this.openLogin()
    }
  }

  async getUserNotification() {
    const x = await this.notification_service.getUserNotifications();
    if (x.status == 200) {
      this.notifications = x.data.notifications;
    }
  }

  async clearNotifications() {
    const x = await this.notification_service.clearUserNotifications();
    if (x.status == 200) {
      location.reload();
      /*await this.getUserNotification();*/
    }
  }

  async updateProfileForm(e: any) {

    e.preventDefault();
    let approved = true;
    const email = document.getElementById('email') as HTMLInputElement;
    //const password = document.getElementById('password') as HTMLInputElement;
    const first_name = document.getElementById('first_name') as HTMLInputElement;
    const last_name = document.getElementById('last_name') as HTMLInputElement;

    if (email.value.length > 0) {
      document.getElementById('email_error')!.classList.add('d-none');
    } else {
      document.getElementById('email_error')!.classList.remove('d-none');
      approved = false;
    }
    /*if (password.value.length > 0) {
      document.getElementById('password_error')!.classList.add('d-none');
    } else {
      document.getElementById('password_error')!.classList.remove('d-none');
      approved = false;
    }*/
    if (first_name.value.length > 0) {
      document.getElementById('first_name_error')!.classList.add('d-none');
    } else {
      document.getElementById('first_name_error')!.classList.remove('d-none');
      approved = false;
    }
    if (last_name.value.length > 0) {
      document.getElementById('last_name_error')!.classList.add('d-none');
    } else {
      document.getElementById('last_name_error')!.classList.remove('d-none');
      approved = false;
    }

    if (approved) {
      const update_profile = await this.user_service.updateProfile(this.profile!);
      if (update_profile.status == 200) {
        this.flash('Your profile has been updated successfully', 'success', {timeout: 3000});
      }
    }

  }

  openReviewImageModel(review_photos: any) {
    this.reviewPhotos = review_photos;
    this.mainReviewImageModel = review_photos[0].url;
    this.showReviewImageModal = !this.showReviewImageModal;

  }

  changeShowReviewImageModal() {
    this.showReviewImageModal = false;
  }
}
</script>
