<template>
  <div align="center" v-if="comicLoaded">
    <div>
      <h1>{{ comic.title }}</h1>
    </div>
    <NavigationButtons
      :showBack="showBack"
      :showNext="showNext"
      @next-comic="nextComic"
      @back-comic="backComic"
      @open-serie="openSerie"
    />
    <div
      class="content-images"
      v-for="(image, index) in comic.imagesPost"
      :key="index"
    >
      <div>
        <img class="img-styles" :src="image" />
      </div>
    </div>

    <NavigationButtons
      :showBack="showBack"
      :showNext="showNext"
      @next-comic="nextComic"
      @back-comic="backComic"
      @open-serie="openSerie"
    />

    <LineDivider />

    <div class="containter-text-rate">
      <span>Rate here!</span>
    </div>

    <div class="custom-star-rating-container">
      <star-rating
        v-model:rating="rating"
        :read-only="rating > 0 ? true : false"
        :show-rating="false"
        :increment="0.01"
        :star-size="starSize"
        :glow="5"
        glow-color="#ffd055"
        @click="postRate()"
      ></star-rating>

      <div class="custom-text">{{ rating }}</div>
    </div>
    <div class="custom-text">Views: {{ comic.views }}</div>
    <LineDivider />
    <div style="margin: 20px">
      <div>
        <h3>Other comics</h3>
      </div>
      <div class="content-comics-azar">
        <div
          v-for="img in azarComics"
          :key="img._id"
          class="content-comics-styles"
        >
          <cardDefault
            :title="img.title"
            :description="img.description"
            :image="img.imagesPost[0]"
            :views="img.views"
            @click="openComic(img._id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  watch,
  nextTick,
} from "vue";
import { useComicStore } from "@/store/comic";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
import cardDefault from "@/components/Cards/cardsDefault.vue";
import router from "@/router";
import StarRating from "vue-star-rating";
import { notify } from "@kyvg/vue3-notification";
import LineDivider from "@/components/LineDivider.vue";
import NavigationButtons from "./Components/NavigationButtons.vue";

const comicStore = useComicStore();
const authStore = useAuthStore();
const route = useRoute();
const rating = ref(0);
const starSize = ref(30);

const comic = ref({});
const serie = ref({});
const orderComics = ref([]);
const azarComics = ref({});
const comicLoaded = ref(false);
const idComic = route.params;
const page = ref();
const runPostRate = ref(true);
const showBack = ref(false);
const showNext = ref(true);
const contador = ref(0);
const viewSended = ref(false);

const updateStarSize = () => {
  if (window.innerWidth <= 600) {
    starSize.value = 20;
  } else {
    starSize.value = 30;
  }
};

onBeforeMount(async () => {
  try {
    const response = await comicStore.getUserComic(idComic.id);
    comic.value = response;
    rating.value = comic.value.score;
    if (rating.value > 0) {
      runPostRate.value = false;
    } else {
      runPostRate.value = true;
    }
    orderComics.value.push(comic.value._id);
    try {
      const response = await comicStore.getAzarComics();
      azarComics.value = response;
      comicLoaded.value = true;
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }

  try {
    const response = await comicStore.getUserSerie(comic.value.serie);
    serie.value = response;
    page.value = serie.value.partsSerie.indexOf(comic.value._id);
  } catch (error) {
    console.error(error);
  }

  pagination();
});

const contadorView = () => {
  contador.value = 0;
  setTimeout(() => {
    if (!viewSended.value) {
      sendView();
      viewSended.value = true;
    }
  }, 10000);
};

onMounted(() => {
  contadorView();
  window.addEventListener("resize", updateStarSize);

  updateStarSize();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateStarSize);
});


const pagination = () => {
  const countPages = serie.value.partsSerie.length;
  if (page.value != 0) {
    showBack.value = true;
  } else {
    showBack.value = false;
  }
  if (page.value === countPages - 1) {
    showNext.value = false;
  } else {
    showNext.value = true;
  }
};

const nextComic = async () => {
  let pageNext = page.value + 1;
  let comicIdNext = serie.value.partsSerie[pageNext];

  router.push(`/viewcomic/${comicIdNext}`);
  await nextTick();
  pagination();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const backComic = async () => {
  let pageNext = page.value - 1;
  let comicIdNext = serie.value.partsSerie[pageNext];
  router.push(`/viewcomic/${comicIdNext}`);
  await nextTick();
  pagination();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const openSerie = () => {
  let serie = comic.value.serie;

  router.push(`/viewserie/${serie}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const openComic = (comic) => {
  router.push(`/viewcomic/${comic}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const postRate = async () => {
  let comicId = comic.value._id;
  let serieId = comic.value.serie;

  if (!authStore.token) {
    rating.value = 0;
    return alert("Debes iniciar sesión");
  }

  if (runPostRate.value) {
    try {
      const rateResponse = await comicStore.postRateComic(
        rating.value,
        comicId
      );

      if (rateResponse.result !== "success") {
        rating.value = 0;
        return notify({
          type: "error",
          title: "Error",
          text: `${rateResponse.message}`,
        });
      }

      const comicScoreResponse = await comicStore.assignScore(comicId);

      if (comicScoreResponse.result !== "success") {
        return notify({
          type: "error",
          title: "Error",
          text: `${comicScoreResponse.message}`,
        });
      }

      const serieScoreResponse = await comicStore.assignScoreSerie(serieId);

      if (serieScoreResponse.result !== "success") {
        return notify({
          type: "error",
          title: "Error",
          text: `${serieScoreResponse.message}`,
        });
      }

      notify({
        type: "success",
        title: "Success",
        text: "All operations were successful",
      });
    } catch (error) {
      notify({
        type: "error",
        title: "Error",
        text: `An unexpected error occurred: ${error.message}`,
      });
    }
  }
};

const sendView = async () => {
  let comicId = comic.value._id;
  let serieId = comic.value.serie;
  if (viewSended.value === false) {
    try {
      const response = await comicStore.countViews(comicId);
      if (response.result === "success") {
        await comicStore.countViewsSerie(serieId);
      }
      viewSended.value = true;
    } catch (error) {
      console.error(error.message);
    }
  }
};

watch(
  () => route.params.id,
  async (newIdComic) => {
    idComic.value = newIdComic;
    try {
      const response = await comicStore.getUserComic(idComic.value);
      comic.value = response;
      rating.value = comic.value.score;
      contadorView();
      viewSended.value = false;
      if (rating.value > 0) {
        runPostRate.value = false;
      } else {
        runPostRate.value = true;
      }
      try {
        const response = await comicStore.getAzarComics();
        azarComics.value = response;
        comicLoaded.value = true;
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await comicStore.getUserSerie(comic.value.serie);
      serie.value = response;
      page.value = serie.value.partsSerie.indexOf(comic.value._id);
    } catch (error) {
      console.error(error);
    }
    pagination();
  }
);
</script>

<style lang="scss">
@import "@/assets/scss/ComicView/ComicView.scss";
</style>
