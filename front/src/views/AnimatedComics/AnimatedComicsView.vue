<template>
  <div style="justify-content: center">
    <LineDivider />

    <div class="container-artists">
      <div>
        <button
          class="button-options"
          :class="{ 'button-options-active': activeBtn === 'featureArtists' }"
          @click="FeatureArtists"
        >
          Featured artists
        </button>
      </div>
      <div>
        <button
          class="button-options"
          :class="{ 'button-options-active': activeBtn === 'newerSeries' }"
          @click="newerSeries"
        >
          Most news
        </button>
      </div>
      <div>
        <button
          class="button-options"
          :class="{ 'button-options-active': activeBtn === 'mostViews' }"
          @click="mostViews"
        >
          Most views
        </button>
      </div>
      <div>
        <button
          class="button-options"
          :class="{ 'button-options-active': activeBtn === 'popularSeries' }"
          @click="popularSeries"
        >
          Popular series
        </button>
      </div>
    </div>

    <LineDivider />
    <div v-if="nameArtist != ''" style="display: flex; justify-content: center;">
      <h2 style="text-shadow: 0 0 5px #b81f59; text-decoration: underline;"> Series of {{ nameArtist }}</h2>
    </div>

    <ListSeries
      v-if="showSeries"
      :series="seriesAnimated"
      :page="page"
      :totalPages="totalPages"
      @prev-page="prevPage"
      @next-page="nextPage"
      @open-serie="openSerie"
    />

    <!-- <div v-if="showSeries">
      <div class="row">
        <div class="comics" v-for="serie in seriesAnimated" :key="serie._id">
          <cardDefault
            class="card-styles"
            :title="serie.nameSerie"
            :description="serie.description"
            :image="serie.frontPage"
            :views="serie.views"
            @click="openSerie(serie._id)"
          />
        </div>
      </div>
      <div
        style="
          margin: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <button
          class="btn-navigation"
          @click="prevPage"
          :disabled="page === 1"
          :class="{ 'btn-navigation-blocked': page === 1 }"
        >
          «
        </button>
        <span style="margin-inline: 5px; color: whitesmoke"
          >Página {{ page }} de {{ totalPages }}</span
        >
        <button
          class="btn-navigation"
          @click="nextPage"
          :disabled="page === totalPages"
          :class="{ 'btn-navigation-blocked': page === totalPages }"
        >
          »
        </button>
      </div>
    </div> -->

    <div v-if="!showSeries" class="container-primary-artists">
      <div class="container-list-artists">
        <h3>These are the most popular artists</h3>
        <div
          v-for="(artist, index) in artists"
          :key="index"
          class="list-artists"
        >
          <button class="btn-artist" @click="artistSeries(artist.name)">
            {{ index + 1 }}. {{ artist.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import LineDivider from "@/components/LineDivider.vue";
import ListSeries from "./components/ListSeries.vue";
import {
  getNewerSeries,
  getAnimatedSeriesMostViews,
  getPopularSeries,
  getFeaturedArtists,
  getArtistSeries
} from "@/services/comicServices.js";
import router from "@/router";

const seriesAnimated = ref({});
const type = ref("Animated");
const page = ref(1);
const limit = ref(10);
const totalPages = ref(0);
const disabledNext = ref(false);
const artists = ref();
const activeBtn = ref("newerSeries");
const showSeries = ref(true);
const nameArtist = ref("");

onBeforeMount(async () => {
  newerSeries();
});

const newerSeries = async () => {
  nameArtist.value = "";
  showSeries.value = true;
  try {
    const response = await getNewerSeries(type.value, page.value, limit.value);
    seriesAnimated.value = response.series;
    totalPages.value = response.totalCount;
  } catch (error) {
    console.error(error);
  }
  activeBtn.value = "newerSeries";
};

const mostViews = async () => {
  nameArtist.value = "";
  showSeries.value = true;
  try {
    const response = await getAnimatedSeriesMostViews(page.value, limit.value);
    seriesAnimated.value = response.series;
    totalPages.value = response.totalCount;
  } catch (error) {
    console.error(error);
  }
  activeBtn.value = "mostViews";
};

const popularSeries = async () => {
  nameArtist.value = "";
  showSeries.value = true;
  try {
    const response = await getPopularSeries(
      type.value,
      page.value,
      limit.value
    );
    seriesAnimated.value = response.series;
    totalPages.value = response.totalCount;
  } catch (error) {
    console.error(error);
  }
  activeBtn.value = "popularSeries";
};

const FeatureArtists = async () => {
  nameArtist.value = "";
  showSeries.value = false;
  try {
    const response = await getFeaturedArtists(type.value);
    artists.value = response.artists;
  } catch (error) {
    console.error(error);
  }
  activeBtn.value = "featureArtists";
};

const artistSeries = async (artist) => {
  showSeries.value = true;
  try {
    const response = await getArtistSeries(artist, page.value, limit.value);
    seriesAnimated.value = response.series;
    totalPages.value = response.totalCount;
  } catch (error) {
    console.error(error);
  }
  nameArtist.value = seriesAnimated.value[0].artist;
};

const getNextComics = async () => {
  try {
    const response = await getNewerSeries(type.value, page.value, limit.value);
    seriesAnimated.value = response.series;
    totalPages.value = response.totalCount;
  } catch (error) {
    console.error(error);
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value += 1;
    getNextComics();
  }

  if (page.value === totalPages.value) {
    disabledNext.value = true;
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value -= 1;
    getNextComics();
  }
};

const openSerie = (serieId) => {
  router.push(`/viewserie/${serieId}`);
};
</script>

<style scoped>
.title {
  color: white;
  text-align: center;
}

.container-primary-artists {
  width: 80%;
  height: 65vh;
  margin: auto;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container-list-artists {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.list-artists {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.btn-artist {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  border: none;
  margin: 5px;
  padding: 5px;
  text-align: justify;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 70%;
}

.btn-artist:hover {
  background-color: #b81f59;
  color: white;
}
.button-options {
  background-color: transparent;
  border: none;
  color: aliceblue;
  text-shadow: 0 0 5px wheat;
  font-size: 1rem;
  cursor: pointer;
  width: 15vw;
  height: 3vh;
}

.button-options:hover {
  background-color: #b81f59;
  width: 15vw;
  height: 3vh;
  border-radius: 10px;
}

.button-options-active {
  background-color: #b81f59;
  border: none;
  border-radius: 10px;
  color: aliceblue;
  text-shadow: 0 0 5px wheat;
  font-size: 1rem;
  cursor: pointer;
  width: 16vw;
  height: 100%;
}

h4 {
  color: white;
  text-align: center;
}

.container-artists {
  height: 5%;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  gap: 10px; /* Ajusta el valor según el espacio deseado entre los elementos */
}

.container-artists > div {
  margin: 0 auto;
}

@media screen and (max-width: 700px) {
  .button-options {
    font-size: 0.8rem;
  }

  .button-options-active {
    font-size: 0.8rem;
  }
}
</style>
