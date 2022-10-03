import {Api} from "@/services/Api";
import {FavoritesService} from "@/services/FavoritesService";
import {ReviewsService} from "@/services/ReviewsService";
import {UserService} from "@/services/UserService";
import {PlaceService} from "@/services/PlaceService";
import {GoogleService} from "@/services/GoogleService";
import {SurveyService} from "@/services/SurveyService";
import {NotificationsService} from "@/services/NotficationsService";

const api = new Api();
const favoritesService = new FavoritesService();
const reviewsService = new ReviewsService();
const userService = new UserService();
const placeService = new PlaceService();
const googleService = new GoogleService();
const surveyService = new SurveyService();
const notificationsService= new NotificationsService();
export default {api, favoritesService, reviewsService, userService, placeService, googleService, surveyService, notificationsService};
