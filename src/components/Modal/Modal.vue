<template>
    <div>
      <b-modal id="bv-modal-example" v-model="showHandcashModal">
        <template #modal-title>
            <font-awesome-icon :icon="['far', icon ]" v-show="icon != ''" class="modal-header__icon" />
            <h3 class="modal-header__title">{{ title }}</h3>
        </template>
        <div>
            <p>{{ body }}</p>
        </div>
        <template #modal-footer>
            <b-button :variant="action.variant" block @click="showHandcashModal = !showHandcashModal" :href="action.url" v-for="action in actions" :key="action.length" :target="action.target">{{ action.text }}</b-button>
        </template>
      </b-modal>
    </div>
</template>

<style lang="scss" src="./Modal.scss"></style>

<script lang="ts">

import {Component, Vue, Prop} from "vue-property-decorator";

type ModalAction = {
    text: string;
    url: string;
    variant: string;
    target: string;
}

@Component

export default class Modal extends Vue {


    @Prop() title!: string;
    @Prop() icon!: string;
    @Prop() body!: string;
    @Prop({default: false}) showHandcashModal!: boolean;
    @Prop({default: {text:'Close',url:'#',variant:'primary'}}) actions!: [ModalAction];
}
</script>
