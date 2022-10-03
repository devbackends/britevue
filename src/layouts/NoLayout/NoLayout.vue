<template>
  <div class="no-layout">
    <router-view/>
  </div>
</template>
<style lang="scss" scoped src="./NoLayout.scss"/>
<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';
import Header from "@/layouts/dashboard/Header/Header.vue";
import Footer from "@/layouts/dashboard/Footer/Footer.vue";
@Component({
  name: "no-layout",
  components: {
    Header,
    Footer
  }
})
export default class NoLayout extends Vue{}
</script>