<template>
  <div align="center" v-if="comicLoaded">
    <div>
      <h1>{{ comic.title }}</h1>
    </div>
    <div>
      <button
        :class="showBack ? 'btn-navigation' : 'btn-navigation-blocked'"
        :disabled="!showBack"
        @click="backComic()"
      >
        «
      </button>
      <button class="btn-navigation" @click="openSerie(comic.serie)">
        <v-icon name="hi-information-circle" />
      </button>
      <button
        :class="showNext ? 'btn-navigation' : 'btn-navigation-blocked'"
        :disabled="!showNext"
        @click="nextComic()"
      >
        »
      </button>
    </div>
    <div
      class="content-images"
      v-for="(image, index) in comic.imagesPost"
      :key="index"
    >
      <div>
        <img class="img-styles" :src="image" />
      </div>
    </div>
    <div class="containter-text-rate">
      <span>Rate here!</span>
    </div>
    <div class="custom-star-rating-container">
      <star-rating
        v-model:rating="rating"
        :show-rating="false"
        :increment="0.01"
        :star-size="starSize"
        :glow="5"
        glow-color="#ffd055"
      ></star-rating>
      <div class="custom-text">{{ rating }}</div>
    </div>
    <div style="border-bottom: 2px solid whitesmoke"></div>
    <div>
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
import cardDefault from "@/components/Cards/cardsDefault.vue";
import router from "@/router";
import StarRating from "vue-star-rating";

const comicStore = useComicStore();
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
const showBack = ref(false);
const showNext = ref(true);

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

onMounted(() => {
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
};

const backComic = async () => {
  let pageNext = page.value - 1;
  let comicIdNext = serie.value.partsSerie[pageNext];
  router.push(`/viewcomic/${comicIdNext}`);
  await nextTick();
  pagination();
};

const openSerie = (serie) => {
  router.push(`/viewserie/${serie}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const openComic = (comic) => {
  router.push(`/viewcomic/${comic}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

watch(
  () => route.params.id,
  async (newIdComic) => {
    idComic.value = newIdComic;
    try {
      const response = await comicStore.getUserComic(idComic.value);
      comic.value = response;
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

<style scoped>
.content-images {
  width: 100%;
  margin-block: 10px;
}

.img-styles {
  box-shadow: 0 0 5px #b81f59;
}

.btn-navigation {
  background-color: #b81f59;
  color: white;
  border: none;
  margin: 2px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 5%;
  height: 10%;
}

.btn-navigation:hover {
  box-shadow: 0 0 5px#ffffff;
}

.btn-navigation-blocked {
  background-color: #7e7e7e;
  color: rgb(252, 252, 252);
  border: none;
  margin: 2px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 5%;
  height: 10%;
}

.content-comics-azar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 80%;
}

.content-comics-styles {
  flex-basis: 25%;
  height: 220px;
  margin: 10px;
  border: 1px solid white;
  cursor: pointer;
}

.containter-text-rate span {
  position: relative;
  display: inline-block;
  font-size: 20px;
  color: white;
  text-shadow: 2px 2px 4px #ffd055;
}

.custom-star-rating-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18%;
  margin-bottom: 20px;
  border: 1px solid #cfcfcf;
  border-radius: 5px;
}

.custom-text {
  font-weight: bold;
  font-size: 1.5em;
  padding: 5px;
  color: #ffffff;
  text-shadow: 0 0 5px #ffd055;
}

img {
  width: 50%;
  height: 70%;
  box-shadow: 0 0 5px gainsboro;
}

@media screen and (max-width: 700px) {
  img {
    width: 90%;
    height: 100%;
    transition: all 0.5s ease-in-out;
  }

  .content-comics-azar {
    width: 100%;
  }

  .custom-star-rating-container {
    width: 50%;
  }

  .custom-text {
    font-size: 1em;
  }
  .btn-navigation {
    width: 10%;
  }

  .btn-navigation-blocked {
    width: 10%;
  }
}
</style>
