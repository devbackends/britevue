<template>
  <div>
    <b-modal
      id="bv-modal-example"
      v-model="showImageModal"
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
                          <img v-if="source=='google'" :src="`https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyDMqrI8hMqiyIPdQUkRUerdohx28Fuv4wE&photo_reference=`+current_image+`&maxwidth=300`" alt="photo.alt" class="modal-image__main-image"/>
                          <img v-else :src="current_image"  alt="photo.alt" class="modal-image__main-image"/>
                        </div>
                        <!--<div class="row">
                            <div class="col">
                                  <div class="modal-image__user-info">
                                      <div class="row align-items-center">
                                          <div class="col-auto pr-0">
                                              <img :src="`https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyDMqrI8hMqiyIPdQUkRUerdohx28Fuv4wE&photo_reference=`+imagesList[0].photo_reference+`&maxwidth=300`" alt="" class="modal-image__user-image">
                                          <p>{{mainImageModel}}</p>
                                          </div>
                                          <div class="col">
                                              <p class="modal-image__user-name">John Doe</p>
                                          </div>
                                      </div>
                                  </div>
                                <div class="col"></div>
                            </div>
                        </div>-->
                    </div>
                </div>
                <div class="col-12 col-lg-4 pl-lg-0">
                    <div class="modal-image__list">
                        <div class="modal-image__close" @click="closeModal()">
                            <font-awesome-icon :icon="['far', 'times']" />
                        </div>
                        <h4 class="modal-header__title">Photos for {{ placeName }}</h4>
                        <div class="row mx-n1 modal-image__list-images">
                            <div class="col-4 px-1 mb-2" v-for="(photo,index) in imagesList"
                        :key="photo.alt">
                                <img v-if="source=='google'" @click="changeImage(index)"
                        :src="`https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyDMqrI8hMqiyIPdQUkRUerdohx28Fuv4wE&photo_reference=`+photo.photo_reference+`&maxwidth=300`"
                        :alt="photo.alt"
                        />
                              <img v-else @click="changeImage(index)"
                                   :src="photo.url"

                              />
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

type PlaceImage = {
  photo_reference: string;
  url: string;
};

@Component
export default class Modal extends Vue {
  @Prop() placeName!: string;
  @Prop({ default: false }) showImageModal!: boolean;
  @Prop() mainImageModel!: string;
  @Prop() mainImageIndex!: number;
  @Prop() source!: string;
  current_image: string;
  current_index: number;
  @Prop({
    default: {
      photo_reference: ""
    },
  })


  imagesList!: [PlaceImage];
  constructor() {
    super();
    this.current_image='';
    this.current_index=0;
    console.log(this.imagesList);

  }
  async mounted(){
    this.current_index=0;
    if(this.source=='google'){
      this.current_image=this.imagesList[0].photo_reference;
    }else{
      this.current_image=this.imagesList[0].url;
    }


  }

  setImage(image: string) {
    this.current_image = image;
  }
  setIndex(index: number) {
    this.current_index = index;
  }
  nextImage(){

    if(this.current_index < this.imagesList.length){
      this.current_index+=1;
      if(this.source=='google'){
        this.current_image=this.imagesList[this.current_index].photo_reference;
      }else{
        this.current_image=this.imagesList[this.current_index].url;
      }

    }
  }
  previousImage(){
    if(this.current_index > 0){
      this.current_index-=1;
      if(this.source=='google'){
        this.current_image=this.imagesList[this.current_index].photo_reference;
      }else{
        this.current_image=this.imagesList[this.current_index].url;
      }

    }
  }
  changeImage(index: number){
    this.current_index=index;
    if(this.source=='google'){
      this.current_image=this.imagesList[this.current_index].photo_reference;
    }else{
      this.current_image=this.imagesList[this.current_index].url;
    }
  }
  closeModal(){
    this.$bvModal.hide('bv-modal-example');
    this.showImageModal = !this.showImageModal;
  }
}
</script>
