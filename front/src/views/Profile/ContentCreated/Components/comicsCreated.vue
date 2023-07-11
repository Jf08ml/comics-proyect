<template>
  <div class="container" v-if="comics != ''">
    <div style="overflow-y: auto">
      <div
        class="row"
        v-for="comicsChunk in paginatedItems"
        :key="comicsChunk[0]._id"
      >
        <div class="comics" v-for="comic in comicsChunk" :key="comic._id">
          <cardDefault
            class="card-styles"
            :title="comic.nameSerie"
            :description="comic.description"
            :image="comic.frontPage"
            :views="comic.views"
          />
          <div class="show-options">
            <div style="margin: 5px">
              <button @click="$emit('show-modal', comic)" class="btn-options">
                <v-icon name="ri-file-edit-fill" color="grey" scale="0.9" />
              </button>
            </div>
            <div style="margin: 5px">
              <button @click="openComic(comic._id)" class="btn-options">
                <v-icon name="hi-eye" color="grey" scale="0.9" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin: 15px">
      <button
        class="button-next"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        «
      </button>
      <span style="margin-inline: 5px"
        >Página {{ currentPage }} de {{ totalPages }}</span
      >
      <button
        class="button-next"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        »
      </button>
      <button class="button-refresh" @click="refreshComics">⟳</button>
    </div>
  </div>
  <div v-else style="margin: auto">
    <h4>You have not created content, cheer up!</h4>
  </div>
</template>
<script setup>
import { computed, onBeforeMount, ref, watch } from "vue";
import cardDefault from "@/components/Cards/cardsDefault.vue";
import { useComicStore } from "@/store/comic";
import router from "@/router";

const comicStore = useComicStore();

const comics = ref();

const isMobile = ref(window.innerWidth < 500);
onBeforeMount(async () => {
  try {
    const response = await comicStore.getUserSeries();
    comics.value = response;
  } catch (error) {
    console.error(error);
  }
});

const openComic = (comic) => {
  router.push(`/viewserie/${comic}`);
};

const refreshComics = async () => {
  try {
    const response = await comicStore.getUserSeries();
    comics.value = response;
  } catch (error) {
    console.error(error);
  }
};

const comicsChunks = ref([]);

// Chunk the comics array into blocks of 4
function chunkComics() {
  const chunkSize = isMobile.value ? 2 : 5;
  for (let i = 0; i < comics.value.length; i += chunkSize) {
    comicsChunks.value.push(comics.value.slice(i, i + chunkSize));
  }
}

// Call chunkComics() when comics array is updated
watch(comics, () => {
  comicsChunks.value = [];
  chunkComics();
});

const itemsPerPage = ref(isMobile.value ? 3 : 2);
const currentPage = ref(1);
const totalPages = computed(() =>
  Math.ceil(comicsChunks.value.length / itemsPerPage.value)
);

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  return comicsChunks.value.slice(startIndex, startIndex + itemsPerPage.value);
});
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
  justify-content: center;
  align-items: center;
}

.comics {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 15px;
  position: relative;
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

@media screen and (max-width: 700px) {
  .card-styles {
    width: 100%;
    height: 220px;
    border: 1px solid black;
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
