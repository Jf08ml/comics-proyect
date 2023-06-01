<template>
  <div align="center">
    <div>
      <h2>{{ serie.nameSerie }}</h2>
    </div>
    <div class="content-description">
      <div class="content-img">
        <img :src="serie.frontPage" class="img-frontpage" />
      </div>
      <div class="content-description-comic">
        <div class="content-text-description">
          <p class="p-description">
            {{ serie.description }}
          </p>
        </div>
        <router-link to="/artist">Artist: {{ serie.artist }}</router-link>
        <div class="chips">
          <div
            v-for="(words, index) in serie.keywords"
            :key="index"
            class="chip"
          >
            {{ words }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <h4 style="color: white">List of comics</h4>
    </div>
    <div
      class="list-comics"
      v-for="(item, index) in serie.partsSerie"
      :key="index"
    >
      <router-link class="custom-router-link" :to="`/viewcomic/${item}`">
        {{ serie.nameSerie }} - part {{ index }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useComicStore } from "@/store/comic";
import { useRoute } from "vue-router";
// import cardDefault from '@/components/Cards/cardsDefault.vue';
// import router from '@/router';

const comicStore = useComicStore();
const route = useRoute();

const serie = ref({});
const orderComics = ref([]);
const idComic = route.params;

onBeforeMount(async () => {
  try {
    const response = await comicStore.getUserSerie(idComic.id);
    serie.value = response;
    orderComics.value.push(serie.value._id);
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
.content-description {
  display: flex;
  justify-content: space-around;
  align-content: center;
  width: 60vw;
  box-shadow: 0 0 2px #ffffff;
  padding: 10px;
  border-radius: 5px;
}

.content-img {
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}

.content-description-comic {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40vw;
}

.content-text-description {
  margin: 20px;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-router-link {
  color: #333;
  display: inline-block;
  width: auto;
  white-space: nowrap;
  font-family: Arial, sans-serif;
  font-size: 16px;
  text-decoration: none;
  padding: 10px 15px;
  border: 1px solid #333;
  background-color: #eee;
  border-radius: 4px;
}

@media (max-width: 600px) {
  .custom-router-link {
    font-size: 14px;
    padding: 8px 12px;
  }
}

.p-description {
  color: whitesmoke;
  text-align: justify;
}

@media (max-width: 600px) {
  .p-description {
    font-size: 11px;
  }
}

.img-frontpage {
  box-shadow: 0 0 5px #010101;
  width: 20vw;
  height: 35vh;
}

@media (max-width: 600px) {
  .img-frontpage {
    width: 40vw;
    height: 20vh;
  }
}
.custom-router-link:hover {
  background-color: #ccc;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  gap: 8px;
}

.chip {
  display: flex;
  align-items: center;
  padding: 2px 6px;
  background-color: #4e73df;
  color: #fff;
  border-radius: 12px;
  font-size: 12px;
  margin-bottom: 8px;
  height: 24px;
}

.list-comics {
  width: 50vw;
  height: 5vh;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 600px) {
  .list-comics {
    width: auto;
    max-width: 80vw;
    height: 5vh;
    margin-top: 10px;
  }

  .content-description {
    width: 90vw;
  }

  .chip {
    font-size: 10px;
    height: 20px;
  }
}
</style>
