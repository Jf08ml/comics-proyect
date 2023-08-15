<template>
  <div class="container" v-if="series != ''">
    <div style="overflow-y: auto">
      <div class="row">
        <div
          :class="series.length > 2 ? 'comics' : 'comic-one-row'"
          v-for="serie in series"
          :key="serie._id"
        >
          <cardDefault
            class="card-styles"
            :title="serie.nameSerie"
            :description="serie.description"
            :image="serie.frontPage"
            :views="serie.views"
          />
          <div class="show-options">
            <div style="margin: 5px">
              <button @click="$emit('show-modal', serie)" class="btn-options">
                <v-icon name="ri-file-edit-fill" color="grey" scale="0.9" />
              </button>
            </div>
            <div style="margin: 5px">
              <button @click="openComic(serie._id)" class="btn-options">
                <v-icon name="hi-eye" color="grey" scale="0.9" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      style="display: flex; flex-direction: row; justify-content: center; align-items: center; tex"
    >
      <button class="button-next" @click="prevPage" :disabled="page === 1">
        «
      </button>
      <span style="margin-inline: 2px"
        >Página {{ page }} de {{ totalPages }}</span
      >
      <button
        class="button-next"
        @click="nextPage"
        :disabled="page === totalPages"
      >
        »
      </button>
    </div>
  </div>
  <div v-else class="content-no-series">
    <span class="text-no-series">You have not created content, cheer up!</span>
  </div>
</template>
<script setup>
import { onBeforeMount, ref, defineExpose } from "vue";
import cardDefault from "@/components/Cards/cardsDefault.vue";
import { useComicStore } from "@/store/comic";
import router from "@/router";

const comicStore = useComicStore();

const series = ref();

const page = ref(1);
const limit = ref(10);
const totalPages = ref(0);

onBeforeMount(async () => {
  fetchSeries();
});

const fetchSeries = async () => {
  try {
    const response = await comicStore.getUserSeries(page.value, limit.value);
    series.value = response.series;
    totalPages.value = response.totalCount;
  } catch (error) {
    console.error(error);
  }
};
const openComic = (comic) => {
  router.push(`/viewserie/${comic}`);
};

const getNextComics = async () => {
  try {
    const response = await comicStore.getUserSeries(page.value, limit.value);
    series.value = response.series;
    totalPages.value = response.totalCount;
  } catch (error) {
    console.error(error);
  }
};

function nextPage() {
  if (page.value < totalPages.value) {
    page.value += 1;
    getNextComics();
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value -= 1;
    getNextComics();
  }
}

const isMobile = window.matchMedia("(max-width: 768px)").matches;
if (isMobile) {
  limit.value = 4;
  getNextComics();
}

defineExpose({fetchSeries});
</script>

<style scoped>
.button-next {
  border-radius: 50%;
  background: transparent;
  border: none;
  font-size: 25px;
  color: brown;
  font-weight: bold;
  cursor: pointer;
}

.button-next:hover {
  text-shadow: 0 0 5px brown;
}

.button-refresh {
  border-radius: 50%;
  background: transparent;
  border: none;
  font-size: 20px;
  color: brown;
  font-weight: bold;
  cursor: pointer;
}

.button-refresh:hover {
  text-shadow: 0 0 5px brown;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  margin: 10px;
  position: relative;
  width: calc(18% - 5px);
  box-sizing: border-box;
}

.comic-one-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  position: relative;
  box-sizing: border-box;
}

.show-options {
  position: absolute;
  background-image: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0.5),
    rgba(56, 51, 51, 0.5)
  );
  color: azure;
  z-index: 1;
  display: none;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.btn-options {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  background-color: #ffffff;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.btn-options:hover {
  box-shadow: 0px 0px 20px #9c9c9c;
}

.comics:hover .show-options {
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px black;
  align-items: center;
  justify-content: center;
  /* Mostramos el div al pasar el mouse sobre el div padre */
}

.card-styles {
  width: 100%;
  height: 220px;
  border: 1px solid black;
  border-radius: 5px;
}

.content-no-series {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  width: 100%;
  height: 90%;
}
.text-no-series {
  color: rgb(3, 103, 190);
  font-size: 3vh;
  white-space: nowrap;
  overflow: hidden;
  border-right: 0.15em solid aliceblue;
  width: 35ch; /* Ajusta este valor según el largo de tu texto */
  animation: typing 2s steps(40, end) forwards,
    blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 35ch;
  } /* Ajusta este valor según el largo de tu texto */
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: aliceblue;
  }
}

@media screen and (max-width: 700px) {
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
  .show-options {
    position: absolute;
    display: block;
    background-image: none;
    color: none;
    z-index: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .btn-options {
    box-shadow: 0 0 3px black;
    width: 25px;
    height: 25px;
  }
}
</style>
