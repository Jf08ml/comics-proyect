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
          :itemsToShow="carouselSize"
          :wrapAround="true"
          :transition="500"
          class="content-carousel"
        >
          <Slide v-for="(comic, index) in azarComics" :key="index">
            <div class="carousel__item">
              <div class="comic-title">
                <h5>{{ comic.title }}</h5>
              </div>
              <div class="comic-photo">
                <img
                  class="img-frontpage"
                  :src="comic.imagesPost[0]"
                  :alt="`Cover of ${comic.title}`"
                />
              </div>
              <div class="comic-hot">
                <img
                  class="img-hot"
                  src="../../public/hot.png"
                />
              </div>
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>
    <div class="content-secondary" style="margin-top: 10px">
      <div class="content-subtitle">
        <LineDivider style="margin: 0" />
        <h2>Real Comics</h2>
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
          <Slide v-for="(comic, index) in azarComics" :key="index">
            <div class="carousel__item">
              <div class="comic-title">
                <h5>{{ comic.title }}</h5>
              </div>
              <div class="comic-photo">
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
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import { useComicStore } from "@/store/comic";
import LineDivider from "@/components/LineDivider.vue";

const comicStore = useComicStore();
const azarComics = ref({});
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
    const response = await comicStore.getAzarComics();
    azarComics.value = response;
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
  height: 49%;
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
  width: 100%;
}
.carousel__item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 92%;
  border-radius: 10px;
  box-shadow: 0 0 5px #000000;
}

.comic-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 10%;
  width: 100%;
  color: aliceblue;
  text-shadow: 0 0 5px #f5669c;
}

.comic-photo {
  height: 90%;
  width: 100%;
}

.img-frontpage {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.img-hot {
    object-fit: cover;
    width: 35px;
    height: 35px;
}


.comic-hot {
  position: absolute;
  bottom: 0;
  left: 0;
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
  transform: rotateY(-10deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 0.9;
  transform: rotateY(-10deg) scale(0.9);
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
