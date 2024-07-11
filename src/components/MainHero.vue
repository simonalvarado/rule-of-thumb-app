<template>
  <header class="hero">
    <img
      class="hero__background"
      srcset="
        ../assets/img/pope-francis.png      750w,
        ../assets/img/pope-francis.@2x.png 1440w
      "
      sizes="(min-width: 750px) 1440px, 100vw"
      src="../assets/img/pope-francis.png"
      alt="Pope Francis"
    />
    <div class="max-centered">
      <FeaturedCard />
    </div>
    <ClosingGauge />
  </header>
</template>

<script setup>
import FeaturedCard from "./FeaturedCard.vue";
import ClosingGauge from "./ClosingGauge.vue";
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  height: 80vw;
  min-height: 35rem;
  max-height: 38rem;
  margin-bottom: 2rem;
}

.hero__background {
  position: absolute;
  left: -35vw;
  width: 160vw;
  height: 100%;
  object-fit: cover;
}

@media all and (min-width: 768px) {
  .hero {
    max-height: 38rem;
  }

  .hero__background {
    top: -6.5rem;
    left: 0;
    width: 110vw;
    height: auto;
  }
}

@media all and (min-width: 1100px) {
  .hero {
    min-height: 700px;
  }

  .hero__background {
    top: -2.5rem;
    left: 0;
    width: 100vw;
    height: auto;
  }
}
</style>
