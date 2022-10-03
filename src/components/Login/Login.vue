<template>
  <b-modal id="login-modal" title="Login to Britevue" centered>
    <template #modal-header="{close}">
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true">&times;</span>
      </button>
      <b-container fluid>
        <!-- Emulate built in modal header close button action -->
        <b-row class="no-gutters">
          <b-col cols="12" class="text-center mb-4">
            <h4 class="modal-title">Login to Britevue</h4>
          </b-col>
        </b-row>
      </b-container>
    </template>
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          <b-form-input v-model="username" onkeyup="this.value = this.value.toLowerCase()" placeholder="Username"></b-form-input>
        </b-col>
        <b-col cols="12">
          <b-form-input type="password" v-model="password" placeholder="Password"></b-form-input>
        </b-col>
      </b-row>
    </b-container>
    <template #modal-footer="{  }">
      <b-container fluid>
        <b-row>
          <b-col cols="12">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button  variant="primary" @click="login">
              Login
            </b-button>
            <p class="text-danger">{{error_message}}</p>
          </b-col>
          <b-col cols="12">
            <div class="singup-text">
              <p>Or login with your</p>
              <div @click="loginHandcash" id="connectButtonSignup">
                HandCash
              </div>
            </div>
          </b-col>
          <b-col cols="12">
            <div class="singup-text">
              <p>If you don’t have an account yet... <span v-on:click="signup()">Sign Up</span></p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-modal>
</template>
<script lang="ts">
import {Vue, Component, Inject} from 'vue-property-decorator';
import "./Login.scss";

import {UserService} from "@/services/UserService";
const HandcashAppID = process.env.VUE_APP_HC_APP_ID

@Component
export default class Login extends Vue {
  username: string;
  password: string;
  @Inject('userService')
  user_ser!: UserService;
  error_message: string;
  open: boolean;
  constructor() {
    super();
    this.username = "";
    this.password = "";
    this.open = false;
    this.error_message = "";
  }
  showModal(){
    this.open = true;
    this.$bvModal.show("login-modal");
  }
  async loginHandcash() {
    const expireIn = new Date(new Date().getTime() + 5 * 60 * 1000);
    this.$cookies.set('loginUser', true, expireIn)
    this.$cookies.set('loginPath', this.$route.path, expireIn)
    window.location.href = 'https://app.handcash.io/#/authorizeApp?appId=' + HandcashAppID
  }
  async login(){
    this.error_message = "";
    let err = null;
    const res = await this.user_ser.login(this.username, this.password).catch(e => err = e);
    if(err || res.status === 400){
      this.error_message = "Please check your credentials.";
      return;
    }
    this.user_ser.currentUser = res;
    this.$bvModal.hide("login-modal");
    this.open = false;
    this.$emit('onLogin', true);
  }
  isOpen() {
    return this.open
  }
  signup(){
    this.open = false;
    this.$bvModal.hide("login-modal");
    this.$emit('openSignup', true);
  }
}
</script>
