<template>
  <NavBar />
  <MainHero />
  <div class="max-centered">
    <BannerTop />
    <PreviousRulings />
    <BannerBottom />
    <hr role="separator" />
    <MainFooter />
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import MainHero from "./components/MainHero.vue";
import BannerTop from "./components/BannerTop.vue";
import PreviousRulings from "./components/PreviousRulings.vue";
import BannerBottom from "./components/BannerBottom.vue";
import MainFooter from "./components/MainFooter.vue";
</script>

<style>
#app {
  width: 100%;
  margin: 0;
  background-color: var(--color-white);
  font-family: "Lato", sans-serif;
  font-size: 12px;
  font-weight: 400;
  position: relative;
}
</style>
