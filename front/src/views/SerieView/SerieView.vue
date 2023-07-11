<template>
  <div align="center">
    <div>
      <h1>{{ serie.nameSerie }}</h1>
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
        <router-link class="custom-router" to="/artist"
          >Artist: {{ serie.artist }}</router-link
        >
        <div class="custom-star-rating-container">
          <star-rating
            v-model:rating="rating"
            :show-rating="false"
            :increment="0.01"
            :star-size="starSize"
            :read-only="true"
            :glow="5"
            glow-color="#ffd055"
          ></star-rating>
          <div class="custom-text">{{ rating }}</div>
        </div>
      </div>
    </div>
    <div>
      <h3 style="color: white">List of comics</h3>
    </div>
    <div
      class="list-comics"
      v-for="(item, index) in serie.partsSerie"
      :key="index"
    >
      <router-link class="custom-router-link" :to="`/viewcomic/${item}`">
        {{ index }}.{{ serie.nameSerie }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import { useComicStore } from "@/store/comic";
import { useRoute } from "vue-router";
import StarRating from "vue-star-rating";

const comicStore = useComicStore();
const route = useRoute();
const starSize = ref(25);

const serie = ref({});
const orderComics = ref([]);
const idComic = route.params;
const rating = ref(0);

const updateStarSize = () => {
  if (window.innerWidth <= 600) {
    starSize.value = 20;
  } else {
    starSize.value = 30;
  }
};

onBeforeMount(async () => {
  try {
    const response = await comicStore.getUserSerie(idComic.id);
    serie.value = response;
    rating.value = serie.value.score;
    orderComics.value.push(serie.value._id);
  } catch (error) {
    console.error(error);
  }
});

onMounted(() => {
  window.addEventListener("resize", updateStarSize);
  updateStarSize();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateStarSize);
});
</script>

<style scoped>
h1 {
  color: #ffffff;
}
.custom-star-rating {
  font-weight: bold;
  font-size: 1.2em;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  color: #999;
}

.custom-router {
  color: #ccc;
}

.content-description {
  display: flex;
  background-color: #010101;
  justify-content: space-around;
  align-content: center;
  width: 60vw;
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
  margin: 8px;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-router-link {
  color: #ffffff;
  display: inline-block;
  width: auto;
  white-space: nowrap;
  font-family: Arial, sans-serif;
  font-size: 16px;
  text-decoration: none;
  padding: 10px 15px;
  border: 1px solid #ffffff;
  border-radius: 4px;
}

.custom-star-rating-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  margin: 20px;
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

@media screen and (max-width: 700px) {
  .custom-star-rating-container {
    width: 100%;
  }

  .custom-text {
    font-size: 1em;
  }
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
  height: 40vh;
  border-radius: 8px;
}

@media (max-width: 600px) {
  .img-frontpage {
    width: 40vw;
    height: 25vh;
  }
}
.custom-router-link:hover {
  color: #000000;
  background-color: #ffffff;
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
}
</style>
