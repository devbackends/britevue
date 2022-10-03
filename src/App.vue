<template>
  <div id="app">
    <component :is="publicLayout">
      <router-view/>
    </component>
  </div>
</template>
<script lang="ts">
import {Component, Vue } from "vue-property-decorator";
import PublicLayout from "@/layouts/public/PublicLayout.vue";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout.vue";
import NoLayout from "@/layouts/NoLayout/NoLayout.vue";
import "./App.scss";
@Component({
  name: "app",
  components: {
    PublicLayout,
    DashboardLayout,
    NoLayout,
  }
})


export default class App extends Vue {
  get publicLayout(){
    if(this.$route.meta.layout === "public"){
      return "public-layout";
    }
    if(this.$route.meta.layout === "dashboard"){
      return "dashboard-layout";
    }
    return "no-layout";
  }

}
</script>
