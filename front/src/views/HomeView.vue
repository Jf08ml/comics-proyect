<template>
  <div class="main-container">
    <div class="content-secondary">
      <div class="content-subtitle">
        <LineDivider style="margin: 0" />
        <h2>Animated Comics</h2>
        <LineDivider style="margin: 0" />
      </div>
      <div class="content-slider">
        <Carousel
          :autoplay="3000"
          :itemsToShow="5"
          :wrapAround="true"
          :transition="500"
          class="content-carousel"
        >
          <Slide v-for="(comic, index) in azarComics" :key="index">
            <div class="carousel__item">
              <div class="comic-title">
                <h5>{{ comic.title }}</h5>
              </div>
              <div style="height: 80%; width: 100%">
                <img
                  :src="comic.imagesPost[0]"
                  :alt="`Cover of ${comic.title}`"
                />
              </div>
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>
    <div class="content-secondary">
      <LineDivider />
      <h2>Real Comics</h2>
      <LineDivider />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import { useComicStore } from "@/store/comic";
import LineDivider from "@/components/LineDivider.vue";

const comicStore = useComicStore();
const azarComics = ref({});
onBeforeMount(async () => {
  try {
    const response = await comicStore.getAzarComics();
    azarComics.value = response;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
h2 {
  text-align: center;
}

.main-container {
  width: 100%;
  height: 100%;
}
.content-secondary {
  height: 50%;
}

.content-subtitle {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  height: 20%;
}
.content-slider {
  display: flex;
  align-content: center;
  justify-content: center;
  height: 80%;
}

.content-carousel {
  display: flex;
  align-content: center;
  justify-content: center;
  height: 100%;
}
.carousel__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 92%;
  box-shadow: 0 0 5px #000000;
}

.comic-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 20%;
  width: 100%;
  color: aliceblue;
}

img {
  object-fit: fill;
  width: 100%;
  height: 280px;
  border-radius: 2px;
}

@media screen and (max-width: 700px) {
  img {
    height: 300px;
  }
}
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>
