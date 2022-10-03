<template>
  <div class="tip">
    <button class="btn tip-trigger p-0" :id="'popover-target-' + reviewId" @click="togglePopover">
      <font-awesome-icon :icon="['fal', 'coin']" />
    </button>

    <!-- <button class="btn tip-trigger p-0" @click="show" :ref="'tip_modal_trigger_' + reviewId">
      <font-awesome-icon :icon="['fal', 'coin']" />
    </button> -->

<b-popover :target="'popover-target-' + reviewId" triggers="click" placement="top" :show.sync="showPopover">
      <div class="icon">
        <font-awesome-icon :icon="['far', 'smile-wink']" />
      </div>
      <div class="tip-title">
        <b v-show="!tipSuccess">Leave a Tip!</b>
        <b v-show="tipSuccess">Thanks!</b>
      </div>

      <div class="input-group tip-form" v-show="!tipSuccess">
        <div class="input-group-prepend">
          <span class="input-group-text">$</span>
        </div>
        <input type="number" v-model="value" @keydown="filter" @keyup="checkValue" class="form-control" placeholder="0.00" aria-label="Tip" aria-describedby="tip-button">
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button" id="tip-button" :disabled="disabled" @click="submit"><font-awesome-icon :icon="['far', 'check']" /></button>
        </div>
      </div>

      <!-- <div class="tip-btn-con">
        <div class="tip-inner">
          <button class="btn tip-btn" :disabled="disabled" @click="submit"></button>
          <input type="hidden" :value="userId" id="user-id">
          <input type="number" v-model="value" @keydown="filter" @keyup="checkValue" class="tip-input">
          <span class="currency" :class="{show: disabled}">{{ currency }}</span>
        </div>
      </div> -->
  </b-popover>
  
  <div class="tip-popover-overlay" :id="'popover-overlay-' + reviewId" @click="togglePopover"></div>

  </div>
</template>
<style lang="scss" src="./Tip.scss"></style>
<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";

@Component
export default class Tip extends Vue{
  @Prop({default: "USD"}) currency!: string;
  @Prop() reviewId!: string;
  @Prop() userId!: string;
  @Prop() tipStatus!: boolean;
  disabled: boolean;
  value: string;
  showPopover: boolean;
  tipSuccess: boolean;
  constructor() {
    super();
    this.disabled = true;
    this.value = "";
    this.showPopover = false;
    this.tipSuccess = false;

  }

  filter(evt: any){
    if(evt.keyCode === 69){
      evt.preventDefault();
    }
  }

  checkValue(){
    this.disabled = !this.value && !this.value.length || this.value === "0";
  }

 async submit(){
   const amount = parseFloat(this.value)
   const x =await  this.$emit('onSubmit',amount,this.userId,this.reviewId);
   console.clear();
   console.log(x);
   if (x.tipStatus) {
     this.tipSuccess = true;
   }


  }
  show(){
    this.$bvModal.show("tip_modal_" + this.reviewId);
    this.calculatePosition();
  }
  calculatePosition(){
    setTimeout(() => {
      const trigger: any = this.$refs['tip_modal_trigger_' + this.reviewId];
      const position = trigger.getBoundingClientRect();
      const modal = (this.$refs["tip_modal_" + this.reviewId] as any).$refs['content'];
      modal!.parentElement!.style.top = parseInt(position.top) - 200 + "px";
      modal!.parentElement!.style.right = parseInt(trigger.offsetLeft) - 180 + "px";
    }, 20);
  }

  togglePopover() {
    const overlay = document.getElementById("popover-overlay-" + this.reviewId);
    this.showPopover = !this.showPopover;
    if(this.showPopover == true) {
      if (overlay) overlay.classList.add("tip-popover-overlay--opened");
    } else {
      if (overlay) overlay.classList.remove("tip-popover-overlay--opened");
    }
  }

}
</script>
