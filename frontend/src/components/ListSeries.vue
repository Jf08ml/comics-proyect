<template>
  <div style="overflow-y: auto">
    <div class="row">
      <div class="comics" v-for="serie in series" :key="serie._id">
        <cardDefault
          class="card-styles"
          :title="serie.nameSerie"
          :description="serie.description"
          :image="serie.frontPage"
          :views="serie.views"
          @click="emitOpenSerie(serie._id)"
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
        @click="emitPrevPage"
        :disabled="page === 1"
        :class="{ 'btn-navigation-blocked': page === 1 }"
      >
        «
      </button>
      <span
        style="
          margin-inline: 5px;
          color: whitesmoke;
          text-shadow: 0 0 5px black;
          -webkit-text-stroke: 1px rgb(129, 114, 114); /* Para navegadores basados en Webkit como Chrome y Safari */
        "
        >Página {{ page }} de {{ totalPages }}</span
      >

      <button
        class="btn-navigation"
        @click="emitNextPage"
        :disabled="page === totalPages"
        :class="{ 'btn-navigation-blocked': page === totalPages }"
      >
        »
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import cardDefault from "@/components/Cards/cardsDefault.vue";

defineProps({
  series: Object,
  page: Number,
  totalPages: Number,
});

const emit = defineEmits(["prev-page", "next-page", "open-serie"]);

const emitNextPage = () => emit("next-page");
const emitPrevPage = () => emit("prev-page");
const emitOpenSerie = (id) => emit("open-serie", id);
</script>

<style scoped>
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
