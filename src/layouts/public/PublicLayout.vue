<template>
  <div class="public-layout">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>
<style lang="scss" scoped>
@import './PublicLayout.scss';
</style>
<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';
import Header from "@/layouts/public/Header/Header.vue";
import Footer from "@/layouts/public/Footer/Footer.vue";


@Component({
  name: "public-layout",
  components: {
    Header,
    Footer
  }
})
export default class PublicLayout extends Vue {

}
</script>