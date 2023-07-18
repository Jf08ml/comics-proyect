<template>
  <div class="main-container">
    <div class="content-secondary">
      <div class="content-subtitle">
        <LineDivider style="margin: 0" />
        <h2 @click="$router.push('/animatedcomics')" style="cursor: pointer">
          Animated Comics<v-icon
            name="bi-box-arrow-in-right"
            scale="1.6"
            color="white"
          ></v-icon>
        </h2>
        <LineDivider style="margin: 0" />
      </div>
      <div class="content-slider">
        <Carousel
          :autoplay="3000"
          :itemsToShow="carouselSize"
          :wrapAround="true"
          :transition="500"
          class="content-carousel"
        >
          <Slide v-for="(serie, index) in animatedSeriesMV" :key="index">
            <div class="carousel__item" @click="openSerie(serie._id)">
              <div class="comic-title">
                <h5>{{ serie.nameSerie }}</h5>
              </div>
              <div class="comic-photo">
                <img
                  class="img-frontpage"
                  :src="serie.frontPage"
                  :alt="`Cover of ${serie.title}`"
                />
              </div>
              <div class="comic-hot">
                <img class="img-hot" src="../../public/hot.png" />
              </div>
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>
    <div class="content-secondary" style="margin-top: 10px">
      <div class="content-subtitle">
        <LineDivider style="margin: 0" />
        <h2 @click="$router.push('/realcomics')" style="cursor: pointer">
          Real Comics<v-icon
            name="bi-box-arrow-in-right"
            scale="1.6"
            color="white"
          ></v-icon>
        </h2>
        <LineDivider style="margin: 0" />
      </div>
      <div class="content-slider">
        <Carousel
          :autoplay="3000"
          :itemsToShow="carouselSize"
          :wrapAround="true"
          :transition="500"
          class="content-carousel"
        >
          <Slide v-for="(serie, index) in realSeriesMV" :key="index">
            <div class="carousel__item" @click="openSerie(serie._id)">
              <div class="comic-title">
                <h5>{{ serie.nameSerie }}</h5>
              </div>
              <div class="comic-photo">
                <img
                  class="img-frontpage"
                  :src="serie.frontPage"
                  :alt="`Cover of ${serie.title}`"
                />
              </div>
              <div class="comic-hot">
                <img class="img-hot" src="../../public/hot.png" />
              </div>
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, onUnmounted, ref } from "vue";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import { useComicStore } from "@/store/comic";
import LineDivider from "@/components/LineDivider.vue";
import router from "@/router";

const comicStore = useComicStore();
const animatedSeriesMV = ref({});
const realSeriesMV = ref({});
const carouselSize = ref(6);

const updateCarouselSize = () => {
  if (window.innerWidth <= 600) {
    carouselSize.value = 2.5;
  } else {
    carouselSize.value = 6;
  }
};

onBeforeMount(async () => {
  try {
    const response = await comicStore.getAnimatedSeriesMostViews();
    animatedSeriesMV.value = response.animatedSeries;
  } catch (error) {
    console.error(error);
  }

  try {
    const response = await comicStore.getRealSeriesMostViews();
    realSeriesMV.value = response.realSeries;
  } catch (error) {
    console.error(error);
  }
});

onMounted(() => {
  window.addEventListener("resize", updateCarouselSize);
  updateCarouselSize();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateCarouselSize);
});

const openSerie = (serieId) => {
  router.push(`/viewserie/${serieId}`);
};
</script>

<style lang="scss">
@import "@/assets/scss/home/home.scss";
</style>
