<template>
  <div class="landing-layout">
    <Header></Header>

    <div>
      <div class="alert-container">
        <flash-message class="myCustomClass"></flash-message>
      </div>
    </div>

    <div
      class="container-fluid review-alert-container"
      ref="review-alert"
      :class="{ 'd-none': hideReviewAlert }"
    >
      <div class="page-content">
        <div class="row">
          <div class="col-12">
            <h4 style="color: #ff9800; font-weight: normal">
              Thanks for your review of {{ reviewdPlaceName }}
            </h4>
            <h5 style="font-weight: 700">Your review helps others!</h5>
            <h6 style="font-weight: normal">
              As other users agree with your review, you will begin earning
              money!
              <a
                style="color: #03a9f4"
                href="javascript:;"
                @click="getRoutePath('place', { id: reviewdPlaceId })"
                >Check out your review</a
              >
            </h6>
          </div>
        </div>
        <span class="review-alert-close" @click="removeReviewAlert()"
          >X<!--<i class="fal fa-times"></i>--></span
        >
      </div>
    </div>

    <div class="container-fluid find-place">
      <div class="row">
        <div class="col-12 col-md-7 py-5">
          <div class="find-place__header">
            <div class="row">
              <div class="col-12">
                <form ref="form">
                  <h4 class="find-place__header-title">
                    Search places near you
                  </h4>
                  <div class="form-inline search-place-form">
                    <div class="row no-gutters w-100">
                      <div class="col-auto search-place-form__select">
                        <select
                          required
                          @change="typeChanged()"
                          v-model="type"
                          class="form-control select-type"
                        >
                          <option value="accounting">Accounting</option>
                          <option value="airport">Airport</option>
                          <option value="amusement_park">Amusement park</option>
                          <option value="aquarium">Aquarium</option>
                          <option value="art_gallery">Art gallery</option>
                          <option value="atm">Atm</option>
                          <option value="bakery">Bakery</option>
                          <option value="bank">Bank</option>
                          <option value="bar">Bar</option>
                          <option value="beauty_salon">Beauty salon</option>
                          <option value="bicycle_store">Bicycle store</option>
                          <option value="book_store">Book store</option>
                          <option value="bowling_alley">Bowling alley</option>
                          <option value="bus_station">Bus station</option>
                          <option value="cafe">Cafe</option>
                          <option value="campground">Campground</option>
                          <option value="car_dealer">Car dealer</option>
                          <option value="car_rental">Car rental</option>
                          <option value="car_repair">Car repair</option>
                          <option value="car_wash">Car wash</option>
                          <option value="casino">Casino</option>
                          <option value="cemetery">Cemetery</option>
                          <option value="church">Church</option>
                          <option value="city_hall">City_hall</option>
                          <option value="clothing_store">Clothing store</option>
                          <option value="convenience_store">
                            Convenience store
                          </option>
                          <option value="courthouse">Courthouse</option>
                          <option value="dentist">Dentist</option>
                          <option value="department_store">
                            Department store
                          </option>
                          <option value="doctor">Doctor</option>
                          <option value="drugstore">Drugstore</option>
                          <option value="electrician">Electrician</option>
                          <option value="electronics_store">
                            Electronics store
                          </option>
                          <option value="embassy">Embassy</option>
                          <option value="fire_station">Fire station</option>
                          <option value="florist">Florist</option>
                          <option value="funeral_home">Funeral_home</option>
                          <option value="furniture_store">Furniture store</option>
                          <option value="gas_station">Gas station</option>
                          <option value="gym">Gym</option>
                          <option value="hair_care">Hair care</option>
                          <option value="hardware_store">Hardware_store</option>
                          <option value="hindu_temple">Hindu temple</option>
                          <option value="home_goods_store">
                            Home goods store
                          </option>
                          <option value="hospital">Hospital</option>
                          <option value="insurance_agency">
                            Insurance agency
                          </option>
                          <option value="jewelry_store">Jewelry Store</option>
                          <option value="laundry">Laundry</option>
                          <option value="lawyer">Lawyer</option>
                          <option value="library">Library</option>
                          <option value="light_rail_station">
                            Light rail station
                          </option>
                          <option value="liquor_store">Liquor_store</option>
                          <option value="local_government_office">
                            Local government office
                          </option>
                          <option value="locksmith">Locksmith</option>
                          <option value="lodging">Lodging</option>
                          <option value="meal_delivery">Meal delivery</option>
                          <option value="meal_takeaway">Meal takeaway</option>
                          <option value="mosque">Mosque</option>
                          <option value="movie_rental">Movie rental</option>
                          <option value="movie_theater">Movie theater</option>
                          <option value="moving_company">Moving company</option>
                          <option value="museum">Museum</option>
                          <option value="night_club">Night club</option>
                          <option value="painter">Painter</option>
                          <option value="park">Park</option>
                          <option value="parking">Parking</option>
                          <option value="pet_store">Pet store</option>
                          <option value="pharmacy">Pharmacy</option>
                          <option value="physiotherapist">Physiotherapist</option>
                          <option value="plumber">Plumber</option>
                          <option value="police">Police</option>
                          <option value="post_office">Post office</option>
                          <option value="primary_school">Primary school</option>
                          <option value="real_estate_agency">
                            Real estate agency
                          </option>
                          <option value="restaurant">Restaurant</option>
                          <option value="roofing_contractor">
                            Roofing contractor
                          </option>
                          <option value="rv_park">Rv park</option>
                          <option value="school">School</option>
                          <option value="secondary_school">
                            Secondary school
                          </option>
                          <option value="shoe_store">Shoe store</option>
                          <option value="shopping_mall">Shopping mall</option>
                          <option value="spa">Spa</option>
                          <option value="stadium">Stadium</option>
                          <option value="storage">Storage</option>
                          <option value="store">Store</option>
                          <option value="subway_station">Subway_station</option>
                          <option value="supermarket">Supermarket</option>
                          <option value="synagogue">Synagogue</option>
                          <option value="taxi_stand">Taxi stand</option>
                          <option value="tourist_attraction">
                            Tourist attraction
                          </option>
                          <option value="train_station">Train station</option>
                          <option value="transit_station">Transit station</option>
                          <option value="travel_agency">Travel agency</option>
                          <option value="university">University</option>
                          <option value="veterinary_care">Veterinary care</option>
                          <option value="zoo">Zoo</option>
                        </select>
                        <small
                          class="form-text text-danger"
                          id="typeErrorMessage"
                        ></small>
                      </div>
                      <div class="col search-place-form__input">
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <div class="input-group-text">Near</div>
                          </div>
                          <input
                            id="pac-input"
                            type="text"
                            placeholder="Place"
                            class="form-control"
                          />
                        </div>
                        <small
                            class="form-text text-danger"
                            id="placeErrorMessage"
                          ></small>
                      </div>
                      <div class="col-auto search-place-form__button">
                        <button
                          class="btn btn-gray-100 header-search__button" type="button"
                          v-on:click="findCloseByButtonPressed()"
                        >
                          <img
                            src="@/assets/images/search_grey.svg"
                            alt="Search"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="find-place__list">
            <div v-if="loadingPlaces" class="find-place__list-loading spinner">
              <b-spinner />
            </div>
            <div
              class="place-card"
              v-else
              v-for="place in places"
              :key="place.id"
            >
              <div class="row">
                <div class="col-12 col-sm-4 mb-3 mb-sm-0">
                  <div class="place-card__images">
                    <div v-if="place.photos">
                      <div class="place-card__images-main">
                        <img
                          v-if="place.photos.length > 0"
                          :src="
                            `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyDMqrI8hMqiyIPdQUkRUerdohx28Fuv4wE&photo_reference=` +
                            place.photos[0].photo_reference +
                            `&maxwidth=300`
                          "
                          @error="imageUrlAlt"
                          alt="Card image cap"
                        />
                        <img
                          v-else
                          src="@/assets/images/no-photo-avatar.png"
                          alt="Card image cap"
                        />
                      </div>
                      <div class="place-card__images-small mt-2" v-if="place.photos.length > 1">
                        <div class="row no-gutters">
                          <div class="col mr-1">
                            <div class="place-card__images-small-item">
                              <img
                                v-if="place.photos.length > 1"
                                :src="
                                  `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyDMqrI8hMqiyIPdQUkRUerdohx28Fuv4wE&photo_reference=` +
                                  place.photos[1].photo_reference +
                                  `&maxwidth=300`
                                "
                                @error="imageUrlAlt"
                                alt="Card image cap"
                              />
                              <img
                                v-else
                                src="@/assets/images/no-photo-avatar-1.png"
                                alt="Card image cap"
                              />
                            </div>
                          </div>
                          <div class="col mx-1">
                            <div class="place-card__images-small-item">
                              <img
                                v-if="place.photos.length > 2"
                                :src="
                                  `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyDMqrI8hMqiyIPdQUkRUerdohx28Fuv4wE&photo_reference=` +
                                  place.photos[2].photo_reference +
                                  `&maxwidth=300`
                                "
                                @error="imageUrlAlt"
                                alt="Card image cap"
                              />
                              <img
                                v-else
                                src="@/assets/images/no-photo-avatar-1.png"
                                alt="Card image cap"
                              />
                            </div>
                          </div>
                          <div class="col ml-1">
                            <div class="place-card__images-small-item">
                              <img
                                v-if="place.photos.length > 3"
                                :src="
                                  `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyDMqrI8hMqiyIPdQUkRUerdohx28Fuv4wE&photo_reference=` +
                                  place.photos[3].photo_reference +
                                  `&maxwidth=300`
                                "
                                @error="imageUrlAlt"
                                alt="Card image cap"
                              />
                              <img
                                v-else
                                src="@/assets/images/no-photo-avatar-1.png"
                                alt="Card image cap"
                              />
                              <span
                                v-if="place.photos.length > 4"
                                @click="goToPhotos(place)"
                                class="place-card__images-small-item-overlay"
                              >
                                <b class="img-text"
                                  >+{{ place.photos.length - 4 }}</b
                                >
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <img v-else
                              src="@/assets/images/no-photo-avatar.png"
                              alt="Card image cap"
                              class="place-card__images-empty"
                            />
                  </div>
                </div>
                <div class="col-12 col-sm">
                  <div class="place-card__content d-flex align-items-start flex-column">
                    <a
                      @click="getRoutePath('place', { id: place.place_id })"
                      href="javascript:;"
                      class="place-card__title"
                    >
                      <h4>{{ place.name }}</h4>
                    </a>
                    <div class="place-card__content-info">
                      <div v-if="typeof place.review_total=='undefined'" class="place-card__rating mb-2">
                        <b-spinner class="spinner"/>
                      </div>
                      <div v-else-if="typeof place.review_total!='undefined' && place.review_total > 0" class="place-card__rating mb-2">
                        <img src="@/assets/images/star.svg" alt="Rating" />
                        <p>
                          <span class="place-card__rating-value">{{ place.britevue_ratings.average }}</span>
                          ({{ place.review_total }} reviews)
                        </p>
                      </div>
                      <div v-else class="place-card__rating mb-2">
                        <img src="@/assets/images/star.svg" alt="Rating" />
                        <p>
                          <span class="place-card__rating-value">N/A</span>
                          ({{ place.review_total }} reviews)
                        </p>
                      </div>
                      <!--<p><span class="mr-3">$$ {{ place.category }}</span><span class="place-card__address">{{ place.vicinity }}</span></p>-->
                      <p></p>
                      <p>{{ place.state }}</p>
                    </div>
                    <div class="place-card__content-actions mt-auto">
                      <div class="row">
                        <div class="col-auto">
                          <button
                            type="button"
                            class="btn btn-primary custom-tooltip"
                            @click="createReview(place.place_id, place.name)"
                          >
                            <span class="icon">
                              <font-awesome-icon :icon="['far', 'star']" />
                            </span>
                            Write a Review
                            <span v-if="!checkUserWallet()" class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can write a Review</span>
                          </button>
                          
                        </div>
                        <div class="col pl-0 pl-sm-3">
                          <div class="place-card__content-actions-social">

                          <a
                            v-on:click="addFavoritePlace(place.place_id)"
                            href="javascript:;"
                            class="custom-tooltip"
                          >
                            <i class="fa-heart" :class="[ typeof place.isFavorite!='undefined'? 'fas' : 'far']" :id="`favorite_${place.place_id}`"></i>
                            <!--<font-awesome-icon :id="`favorite_${place.place_id}`" :icon="[ typeof place.isFavorite!='undefined'? 'fas' : 'far', 'heart']" />-->

                            <span v-if="!checkUserWallet()" class="custom-tooltip-text custom-tooltip-text-top">Connect a wallet to your account before you can add to favorite</span>
                          </a>
                          
                          <a
                            target="_blank"
                            :href="`http://twitter.com/share?text=Check out this amazing place &url=${getBaseUrl()}place/${
                              place.place_id
                            }`"
                            data-size="large"
                          >
                            <font-awesome-icon :icon="['far', 'share-alt']" />
                          </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-5 px-0">
          <div class="find-places__map-wrapper">
            <div id="map" ref="map" class="find-places__map-sticky"></div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<style lang="scss" src="./Landing.scss"></style>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDMqrI8hMqiyIPdQUkRUerdohx28Fuv4wE&libraries=places"></script>
<script lang="ts">
import axios from "axios";
import { Vue, Component, Inject } from "vue-property-decorator";
import { IGooglePlace } from "@/interfaces/IGooglePlace";
import { Loader, LoaderOptions } from "google-maps";
import Header from "@/layouts/dashboard/Header/Header.vue";
import Footer from "@/layouts/dashboard/Footer/Footer.vue";
import { UserService } from "@/services/UserService";
import { IUser } from "@/interfaces/IUser";
import { PlaceService } from "@/services/PlaceService";
import { FavoritesService } from "@/services/FavoritesService";
@Component({
  components: {
    Header,
    Footer,
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
export default class Landing extends Vue {
  profile: IUser | null = null;
  lat: number;
  lng: number;
  type: string;
  loadingPlaces: boolean;
  loadingMap: boolean;
  radius: number;
  hideReviewAlert: boolean;
  reviewdPlaceId: string = "";
  reviewdPlaceName: string = "";
  input_location: any;

  @Inject("favoritesService")
  favorites_ser!: FavoritesService;

  @Inject("placeService")
  place_ser!: PlaceService;

  @Inject("userService")
  user_service!: UserService;

  flash: any;

  constructor() {
    super();
    this.lat = 45.422164978;
    this.lng = -75.6916639;
    this.type = "restaurant";
    this.loadingPlaces = true;
    this.loadingMap = true;
    this.radius = 5;
    this.hideReviewAlert = true;
    this.input_location = null;
    if (typeof this.$route.params.review != "undefined") {
      this.hideReviewAlert = false;
      this.reviewdPlaceId = this.$route.params.place_id;
      this.reviewdPlaceName = this.$route.params.place_name;
    }

    this.locatorButtonPressed();
  }

  async mounted() {
    await this.user_service.updateUserLocalStorage("");
    const user = await this.user_service.getCurrentUser();
    if (user) {
      this.profile = user;
      //check user token is expired
      const checkUser = this.user_service.getUser(this.profile.id);
    }

    await this.locatorButtonPressed();

    if(this.lat && this.lng && this.lat != 45.422164978 && this.lng != -75.6916639) {
      const address = await this.place_ser.getAddressForCoordinates(this.lat,this.lng);
/*       console.log('address');
       console.log(address);*/
      if (address.status != 200) {
        return
      }
      const input = document.getElementById("pac-input") as HTMLInputElement;

      input.value = address.data;
/*      const autocomplete = new google.maps.places.Autocomplete(input);

      console.log('autocomplete.getPlace()');
      console.log(autocomplete.getPlace());*/

    }
    await this.loadMap();
    await this.loadInitialPlaces();

  }
  async coordinates() {
    return `${this.lat}, ${this.lng}`;
  }
  async loadInitialPlaces() {
    this.loadingPlaces = true
    const google_places = await this.place_ser.searchGoogleLocations(this.lat,this.lng,this.type,this.radius);
    this.loadingPlaces = false;
   const places = await this.checkPlacesIsFavorite(google_places.data.Results);
    this.places = places;

    let initial_places=[];
    if (google_places.status== 200) {
      for (let i=0;i<google_places.data.Results.length;i++) {
        const brite_place = await this.place_ser.getBriteLocation(google_places.data.Results[i].place_id)

        initial_places.push(brite_place.data)
      }
      const places = await this.checkPlacesIsFavorite(initial_places);
      this.places=initial_places
      this.addLocationsToGoogleMaps();
    }

  }
  async findCloseByButtonPressed(e: any) {
    let el = document.getElementById("typeErrorMessage");
    if (el == null) {
      return "";
    }
    if (this.type == "") {
      el.innerHTML = "This field is required";
      return "";
    }
    el.innerHTML = "";
    el = document.getElementById("placeErrorMessage");
    if (el == null) {
      return "";
    }

    if (this.input_location == null) {
      el.innerHTML = "This field is required";
      return "";
    }
    el.innerHTML='';
    this.loadingPlaces = true
    const google_places = await this.place_ser.searchGoogleLocations(this.lat,this.lng,this.type,this.radius);
    this.places = []
    if (google_places.status==200) {
        for (let i=0;i<google_places.data.Results.length;i++) {
          const brite_place = await this.place_ser.getBriteLocation(google_places.data.Results[i].place_id)
          this.places.push(brite_place.data)
        }
        this.addLocationsToGoogleMaps();
    }
    this.loadingPlaces = false;
  }
  addLocationsToGoogleMaps() {
    this.loadMap();
  }
  async locatorButtonPressed() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      },
      (error) => {
        console.log("Error getting location");
      }
    );


  }

  //dummy data
  places: IGooglePlace[] = [];

  async loadMap() {
    const options: LoaderOptions = {
      language: "en",
      libraries: [
        "drawing",
        "geometry",
        "localContext ",
        "places",
        "visualization",
      ],
    };
    const loader = new Loader(
      "AIzaSyDMqrI8hMqiyIPdQUkRUerdohx28Fuv4wE",
      options
    );
    const google = await loader.load();
    const con: any = this.$refs.map;
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById(
      "infowindow-content"
    ) as HTMLElement;
    const input = document.getElementById("pac-input") as HTMLInputElement;
    this.input_location=input.value;
    const autocomplete = new google.maps.places.Autocomplete(input);
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.addListener("place_changed", () => {
      autocomplete.bindTo("bounds", map);
      // Set the data fields to return when the user selects a place.
      autocomplete.setFields([
        "address_components",
        "geometry",
        "icon",
        "name",
      ]);
      //get autocomplete location
      const input_location = autocomplete.getPlace();

      if (
        input_location == null ||
        input_location.geometry == null ||
        input_location.geometry.location == null
      ) {
        return;
      }
      this.input_location = input_location;
      this.lat = input_location.geometry.location.lat();
      this.lng = input_location.geometry.location.lng();

      infowindow.close();
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          input_location.geometry.location.lat(),
          input_location.geometry.location.lng()
        ),
        map: map,
      });
      marker.setVisible(false);
      const place = autocomplete.getPlace();

      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        this.flash(
          "No details available for input: '" + place.name + "'",
          "error",
          { timeout: 5000 }
        );
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17); // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      let address = "";

      if (place.address_components) {
        address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
            "",
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
            "",
          (place.address_components[2] &&
            place.address_components[2].short_name) ||
            "",
        ].join(" ");
      }
      infowindow.setContent(
        `<div class="ui header">${place.name}</div><p>${place.formatted_address}</p>`
      );
      infowindow.open(map, marker);
    });

    //load map
    const map = new google.maps.Map(con, {
      center: { lat: this.lat, lng: this.lng },
      zoom: 14,
    });

    this.places.forEach((place) => {
      const lat = place.geometry.location.lat;
      const lng = place.geometry.location.lng;
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
      });
      google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(
          `<div class="ui header">${place.name}</div><p>${place.formatted_address}</p>`
        );
        infowindow.open(map, marker);
      });
    });
  }
  createReview(place_id: any,place_name: any){
    if(this.checkUserWallet()){
      this.$router.push({name: "new_review", params: { 'place_id': place_id,'place_name':place_name }});
    }
  }
  typeChanged() {
    const selectElement = document.querySelector(".type-label");
    if (selectElement != null) {
      selectElement.classList.add("d-none");
    }
  }
  radiusChanged() {
    const selectElement = document.querySelector(".radius-label");
    if (selectElement != null) {
      selectElement.classList.add("d-none");
    }
  }
  imageUrlAlt(event: any) {
    event.target.src = require("@/assets/images/no-photo-avatar.png");
  }
  removeReviewAlert() {
    this.hideReviewAlert = true;
  }
  getRoutePath(name: string, parameters: any) {
    return this.$router.push({ name: name, params: parameters });
  }
  goToPhotos(place: any) {
    this.getRoutePath("place_photos", { place: place });
  }
  async addFavoritePlace(place_id: any){
    if(this.checkUserWallet()){
      const add_favorite_place = await this.favorites_ser.addFavorite(this.profile!.id,'location',place_id);
      if(add_favorite_place.status==200){
        const element=document.getElementById('favorite_'+place_id) as HTMLElement ;
        element.classList.remove('far');
        element.classList.add('fas');
        this.flash('Place has been added as your favorite', 'success', {timeout: 5000});
      }
      if(add_favorite_place.status==409){
        this.flash('You have already added this place to favorite', 'error', {timeout: 5000});
      }
    }
  }
  getBaseUrl() {
    return window.location.origin + this.$route.path;
  }
  public async logout() {
    localStorage.removeItem("user");
  }
  checkUserWallet() {
    if(this.profile){
      if (this.profile.wallet) {
        return true;
      } else {
        return false;
      }
    }else{
      return false;
    }
  }

  async checkPlacesIsFavorite(places: any){
    let favorite_places = await this.favorites_ser.places(this.profile!.id);
    if (favorite_places.status == 200) {
      favorite_places = favorite_places.data;
      const favorite_locations = new Array(favorite_places.length)
      if (favorite_places && favorite_places.length) {
        for (let i = 0; i < favorite_places.length; i++) {
          for (let j = 0;j < places.length; j++) {
            if(favorite_places[i].favorite==places[j].place_id){
              places[j].isFavorite=true;
            }
          }

        }
      }
    }
  return places;
  }

}
</script>
