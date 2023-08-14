<template>
  <div v-show="isOpen" class="modal">
    <div class="modal-content">
      <input
        class="inputSearch"
        type="text"
        placeholder="Search..."
        v-model="searchQuery"
        @input="performSearch"
      />
      <v-icon
        name="md-close-sharp"
        scale="1.2"
        class="iconSearch"
        color="red"
        title="Close search"
        @click="close"
      />
    </div>
    <div class="results" v-if="searchQuery.length > 0">
      <div v-if="isLoading" class="loading">
        Loading series... write 2 letters minimum
      </div>
      <div v-if="!isLoading && searchResults.length === 0" class="notFound">
        Serie not found
      </div>

      <ListSeries
        v-if="!isLoading && searchResults.length > 0"
        :series="searchResults"
        :page="page"
        :totalPages="totalPages"
        @prev-page="prevPage"
        @next-page="nextPage"
        @open-serie="openSerie"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, nextTick } from "vue";
import { searchSerie } from "@/services/comicServices";
import ListSeries from "@/views/AnimatedComics/components/ListSeries.vue";
import router from "@/router";

defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const searchQuery = ref("");
const searchResults = ref([]);
const isLoading = ref(false);
const page = ref(1);
const totalPages = ref(0);
const limit = ref(6);

const close = () => {
  searchQuery.value = "";
  searchResults.value = [];
  emit("close");
};

const getSearchSeries = async () => {
  const response = await searchSerie(
    searchQuery.value,
    page.value,
    limit.value
  );
  if (response.message) {
    searchResults.value = [];
  } else if (response.series && response.series.length > 0) {
    searchResults.value = response.series;
    totalPages.value = response.totalCount;
  }
};

const performSearch = async () => {
  isLoading.value = true;
  if (searchQuery.value.length >= 2) {
    await getSearchSeries();
    isLoading.value = false;
  }
};

const nextPage = async () => {
  if (page.value < totalPages.value) {
    page.value += 1;
    await getSearchSeries();
    await nextTick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const prevPage = async () => {
  if (page.value > 1) {
    page.value -= 1;
    await getSearchSeries();
    await nextTick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const openSerie = async (serieId) => {
  router.push(`/viewserie/${serieId}`);
  await nextTick();
  close();
};
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  width: 100%;
  z-index: 2;
}

.modal-content {
  position: relative;
  width: 100%;
  background: none;
  z-index: 2;
}

.results {
  position: absolute;
  top: 100%;
  left: 10px;
  right: 0;
  z-index: 1;
  background: white;
  width: 70vw;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.inputSearch {
  width: 80%;
}

.iconSearch {
  position: absolute;
  top: 32%;
  left: 85%;
  cursor: pointer;
}

.loading {
  color: black;
  margin-top: 10px;
  text-align: center;
  animation: blink 1s linear infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.notFound {
  color: black;
  margin-top: 10px;
  text-align: center;
  animation: colorchange 1s infinite;
}

@keyframes colorchange {
  0% {
    color: black;
  }
  25% {
    color: red;
  }
}

@media screen and (max-width: 700px) {
  .results {
    position: absolute;
    top: 100%;
    width: 80vw;
    left: 6%;
    z-index: 1;
    right: 0;
  }
  .iconSearch {
    position: absolute;
    top: 33%;
    left: 82%;
    cursor: pointer;
  }
}
</style>
