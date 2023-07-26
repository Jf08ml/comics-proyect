<template>
  <div style="justify-content: center">
    <div>
      <h1 class="title">Animated Comics</h1>
    </div>
    <LineDivider />
    <div class="container-artists">
      <div>
        <button class="button-options">Featured artists</button>
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
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import LineDivider from "@/components/LineDivider.vue";
import cardDefault from "@/components/Cards/cardsDefault.vue";
import {
  getNewerSeries,
  getAnimatedSeriesMostViews,
  getPopularSeries,
} from "@/services/comicServices.js";
import router from "@/router";

const seriesAnimated = ref({});
const type = ref("Animated");
const page = ref(1);
const limit = ref(10);
const totalPages = ref(0);
const disabledNext = ref(false);
const activeBtn = ref("newerSeries");

onBeforeMount(async () => {
  newerSeries();
});

const newerSeries = async () => {
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
  width: 15vw;
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

.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
}

.comics {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px;
  position: relative;
  width: calc(18% - 5px);
  box-sizing: border-box;
}

.card-styles {
  width: 90%;
  height: 300px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
}

.card-styles:hover {
  box-shadow: 0 0 40px #b81f59;
}

@media screen and (max-width: 700px) {
  .btn-navigation {
    width: 10%;
  }
  .card-styles {
    width: 100%;
    height: 220px;
    border: 1px solid black;
  }

  .comics {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 10px;
    position: relative;
    width: calc(40% - 5px);
    box-sizing: border-box;
  }
}
</style>
