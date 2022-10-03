<template>
  <div class="dashboard-layout">
    <Header></Header>
    <div class="dashboard-layout">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>
<style lang="scss" scoped src="./DashboardLayout.scss"/>
<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';
import Header from "@/layouts/dashboard/Header/Header.vue";
import Footer from "@/layouts/dashboard/Footer/Footer.vue";
@Component({
  name: "dashboard-layout",
  components: {
    Header,
    Footer
  }
})
export default class DashboardLayout extends Vue{}
</script>