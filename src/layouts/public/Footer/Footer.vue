<template>
<div class="footer">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-12 col-lg-6 footer__logo">
        <div class="logo-white">
          <img src="@/assets/images/logo_grey.svg" alt="BrightVue" />
          <p>©2021 britevue.com All Rights Reserved</p>
        </div>
      </div>
      <div class="col-12 col-lg-6 footer__links">
        <ul>
          <li><a href="mailto:support@britevue.com">Contact</a></li>
          <!--<li><router-link to="/about">About Us</router-link></li>-->
          <li><router-link to="/privacy">Privacy Policy</router-link></li>
          <li><router-link to="/terms">Terms And Conditions</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
<style lang="scss" scoped>
@import "./Footer.scss";
</style>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class Footer extends Vue {}
</script>
