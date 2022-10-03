<template>
  <b-modal id="signup-modal" title="Sign up to Britevue" size="lg" centered>
    <template #modal-header="{close}">
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true">&times;</span>
      </button>
      <b-container fluid>
        <!-- Emulate built in modal header close button action -->
        <b-row class="no-gutters">
          <b-col cols="12" class="text-center mb-4">
            <h4 class="modal-title">Sign up to Britevue</h4>
          </b-col>
        </b-row>
      </b-container>
    </template>
    <b-container fluid>
      <b-row class="signup-input">
        <div class="col-12">
          <div class="row name-con">
            <div class="col-6">
              <b-form-input v-model="user.firstName" placeholder="First Name" :class="''"></b-form-input>
            </div>
            <div class="col-6">
              <b-form-input v-model="user.lastName" placeholder="Last Name" :class="''"></b-form-input>
            </div>
          </div>
        </div>
        <b-col cols="12">
          <b-form-input v-model="user.id" onkeyup="this.value = this.value.toLowerCase()" placeholder="Username"></b-form-input>
        </b-col>
        <b-col cols="12">
          <b-form-input v-model="user.email" placeholder="Email"></b-form-input>
        </b-col>
        <b-col cols="12">
          <b-form-input type="password" v-model="user.password" placeholder="Password"></b-form-input>
        </b-col>
        <b-col cols="12">
          <b-form-input type="password" v-model="user.confirmPassword" placeholder="Confirm Password"></b-form-input>
        </b-col>
      </b-row>
    </b-container>
    <template #modal-footer="{  }">
      <b-container fluid>
        <b-row>
          <b-col cols="12">
            <p class="text-danger">{{error_message}}</p>
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button size="lg" variant="primary" @click="signup" :class="loading ?'disabled': ''" :disabled="loading">
              Sign Up
            </b-button>
          </b-col>
          <b-col cols="12">
            <div class="singup-text">
              <p>Or sign-up with your</p>
              <div @click="signupHandcash" id="connectButtonSignup">
                HandCash
              </div>
            </div>
          </b-col>
        </b-row>
        <p>By creating an account you agree to our <a href="https://britevue.com/terms" target="_blank" >Terms of Service</a></p>
      </b-container>
    </template>
  </b-modal>
</template>
<script lang="ts">
const HandcashAppID = process.env.VUE_APP_HC_APP_ID
import { Vue, Component, Inject} from 'vue-property-decorator';
import "./Signup.scss";
import {INewUser} from "@/interfaces/INewUser";
import {UserService} from "@/services/UserService";

@Component
export default class Signup extends Vue {
  user: INewUser

  @Inject('userService')
  user_ser!: UserService;
  loading = false;
  error_message: string;
  open: boolean;

  constructor() {
    super();
    this.open = false;
    this.error_message = "";
    this.user = {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      active: true,
    };
  }
  isOpen() {
    return this.open
  }
  showModal(){
    this.open = true;
    this.$bvModal.show("signup-modal");
  }
  async signupHandcash() {
    const expireIn = new Date(new Date().getTime() + 5 * 60 * 1000);
    this.$cookies.set('signupUser', true, expireIn)
    window.location.href = 'https://app.handcash.io/#/authorizeApp?appId=' + HandcashAppID
  }

  async signup(){
    this.error_message = ""
    if (this.user.firstName == "" || this.user.lastName == "") {
      this.error_message = "Please supply your first and last name"
      return
    }
    if (this.user.id == "") {
      this.error_message = "Please pick a username"
      return
    }
    if (!/^([a-z0-9]{5,})$/.test(this.user.id)) {
      this.error_message= "Username must be at least 5 alphanumeric characters, all lowercase"
        return
    }
    if (this.user.email == "") {
      this.error_message = "Please supply your email address"
      return
    } else {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.user.email)) {
        this.error_message = "Please supply a valid email address"
        return
      }
    }
    if (this.user.password == "") {
      this.error_message = "Please supply a password"
    }
    if (this.user.password !== this.user.confirmPassword) {
      this.error_message = "Passwords do not match"
      return
    }
    if (this.user.password && this.user.password.length < 6) {
      this.error_message = "Password must be at least 6 characters long"
      return
    }
    this.loading = true;
    let err = null;
    await this.user_ser.signup(this.user).catch(e => err = e);
    if(!err){
      await this.user_ser.login(this.user.id, this.user.password!).catch(e => err = e);
      this.loading = false;
      if(!err){
        this.$bvModal.hide("signup-modal");
        this.open = false;
        this.$emit('onSignup', true);
      }
    } else {
      this.error_message = "username has already been taken, please select a new one"
    }
    this.loading = false;
  }
}
</script>
