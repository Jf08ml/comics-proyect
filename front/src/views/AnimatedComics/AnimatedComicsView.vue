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
        <button class="button-options">Most news</button>
      </div>
      <div>
        <button class="button-options">Most views</button>
      </div>
      <div>
        <button class="button-options">Popular series</button>
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
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import LineDivider from "@/components/LineDivider.vue";
import cardDefault from "@/components/Cards/cardsDefault.vue";
import { getNewerSeries } from "@/services/comicServices.js";

const seriesAnimated = ref({});
const type = ref("Animated");

onBeforeMount(async () => {
  try {
    const response = await getNewerSeries(type.value);
    seriesAnimated.value = response.animatedSeries;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
.title {
  color: white;
  text-align: center;
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
}
</style>
