<template>
  <div>
    <b-modal
        id="bv-review-example"
        v-model="showReviewImageModal"
        size="xl"
        hide-footer
        hide-header
        @hide="closeModal"
    >
      <div class="modal-image">
        <div class="row">
          <div class="col-12 col-lg-8">
            <div class="modal-image__main">
              <button id='previous' @click="previousImage()" class="modal-image__arrow modal-image__arrow--left"><font-awesome-icon :icon="['far', 'chevron-left']" /></button>
              <button id='next' @click="nextImage()" class="modal-image__arrow modal-image__arrow--right"><font-awesome-icon :icon="['far', 'chevron-right']" /></button>
              <div class="">
                <img :src="mainReviewImageModel"  alt="photo.alt" class="modal-image__main-image"/>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4 pl-lg-0">
            <div class="modal-image__list">
              <div class="modal-image__close" @click="closeModal()">
                <font-awesome-icon :icon="['far', 'times']" />
              </div>
              <div class="row mx-n1 modal-image__list-images">
                <div class="col-4 px-1 mb-2" v-for="(photo,index) in photos"
                     :key="photo.alt">
                  <img @click="changeImage(index)" :src="photo.url"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<style lang="scss" src="./ImageModal.scss"></style>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";


type reviewImage = {
  url: string;
};
@Component
export default class Modal extends Vue {



  current_index: number;
  @Prop() showReviewImageModal!: boolean;
  @Prop() mainReviewImageModel!: string;
  @Prop({
    default: {
      url: ""
    },
  })
  photos!: [reviewImage];

  constructor() {
    super();
    this.current_index=0;
  }
  async mounted(){
    this.current_index=0;
  }
  setIndex(index: number) {
    this.current_index = index;
  }
  nextImage(){
    if(this.current_index < this.photos.length){
      this.current_index+=1;
      this.mainReviewImageModel=this.photos[this.current_index].url;
    }
  }
  previousImage(){
    if(this.current_index > 0){
      this.current_index-=1;
      this.mainReviewImageModel=this.photos[this.current_index].url;
    }
  }
  changeImage(index: number){
    this.current_index=index;
    this.mainReviewImageModel=this.photos[this.current_index].url;

  }
  closeModal(){
    this.$bvModal.hide('bv-review-example');
    this.showReviewImageModal = !this.showReviewImageModal;
    this.$emit('changeShowReviewImageModal', true);
  }
}
</script>
