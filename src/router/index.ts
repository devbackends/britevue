import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Public/Home/Home.vue'
import PrivacyPolicy from '@/views/Dashboard/PrivacyPolicy/PrivacyPolicy.vue'
import Terms from '@/views/Dashboard/Terms/Terms.vue'
import Landing from "@/views/Dashboard/Landing/Landing.vue";
import Profile from "@/views/Dashboard/Profile/Profile.vue";
import Dashboard from "@/views/Dashboard/Dashboard.vue";
import Place from "@/views/Dashboard/Place/Place.vue";
import PlacePhotos from "@/views/Dashboard/PlacePhotos/PlacePhotos.vue";
import NewReview from "@/views/Dashboard/NewReview/NewReview.vue";
import VueMeta from 'vue-meta'

import NotFoundPage from '@/views/Dashboard/NotFoundPage/NotFoundPage.vue';
Vue.use(VueRouter)
Vue.use(VueMeta)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {layout: "public"}
  },
  {
    path: '/privacy',
    name: 'privacypolicy',
    component: PrivacyPolicy,
    meta: {protected: false, layout: "dashboard"}
  },
  {
    path: '/terms',
    name: 'termsofservice',
    component: Terms,
    meta: {protected: false, layout: "dashboard"}
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {protected: true, layout: "dashboard"},
    redirect: {name: "landing"},
    children: [
      {
        path: "",
        name: "landing",
        component: Landing,
        meta: {protected: true, layout: "no-layout"},
      },
      {
        path: "profile/:id",
        name: "profile",
        component: Profile,
        meta: {protected: true, layout: "dashboard"},
      },
      {
        path: "place/:id",
        name: "place",
        component: Place,
        meta: {protected: true, layout: "dashboard"},
      },
      {
        path: "place-photos",
        name: "place_photos",
        component: PlacePhotos,
        meta: {protected: true, layout: "dashboard"},
      },
      {
        path: "new-review",
        name: "new_review",
        component: NewReview,
        meta: {protected: true, layout: "dashboard"},
      },{
        path: '*',
        name: "not_found_page",
        component: NotFoundPage,
        meta: {protected: true, layout: "dashboard"}
      }
    ],
  },
  {
    path: '*',
    name: "not_found",
    component: NotFoundPage,
    meta: {protected: true, layout: "dashboard"}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0,0)
  next()
})

export default router
