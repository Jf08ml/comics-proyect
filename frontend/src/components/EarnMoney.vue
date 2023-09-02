<template>
  <div class="content" :key="key">
    <div class="box-header">
      <h3>Earn money here!</h3>
      <span
        >To win money you must upload or select a new serie from your profile,
        which will be submitted for review. The dynamic to win will be in a time
        of 20 days, the 5 most viewed comics will win a sum of money according
        to the views made between the 5 comics.
      </span>
      <button @click="getAvaibleSeries" class="button-primary" type="submit">
        I want to earn money
      </button>
    </div>
    <div class="box-content">
      <div v-if="showSeries">
        <span>Select serie to inscribe: </span>
      </div>
      <div v-if="showSeries">
        <ListSeries
          :series="seriesAvaibles"
          :page="page"
          :totalPages="totalPages"
          actionType="select"
          @selected-serie="confirmInscribeSerie"
          @prev-page="prevPage"
          @next-page="nextPage"
        />
      </div>
    </div>
    <ModalConfirmation
      v-if="showModalConfirmation"
      title="Confirm inscription"
      :message="messageConfirmation"
      :confirmarModal="selectSerieToInscribe"
      :cancelarModal="confirmInscribeSerie"
    />
    <ModalLoading v-if="showModalLoading" />
  </div>
</template>

<script setup>
import ListSeries from "@/components/ListSeries.vue";
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { notify } from "@kyvg/vue3-notification";

import {
  getSeriesToInscribe,
  enteredSeries,
} from "@/services/comicServices";
import ModalConfirmation from "@/components/Modals/ModalConfirmation.vue";
import ModalLoading from "@/components/Modals/ModalLoading.vue";

const route = useRoute();
const key = ref(0);
const authStore = useAuthStore();
const token = authStore.$state.token;
const page = ref(1);
const limited = ref(6);
const totalPages = ref(0);
const seriesAvaibles = ref([]);
const serieSelected = ref([]);
const showSeries = ref(false);
const showModalConfirmation = ref(false);
const showModalLoading = ref(false);
const messageConfirmation = ref("");

watch(
  () => route.params.type,
  () => {
    key.value++;
  }
);

const getAvaibleSeries = async () => {
  if(!token) {
    return notify({
        type: "error",
        title: "Log in",
        text: 'You must log in to inscribe',
      });
  }
  try {
    const response = await getSeriesToInscribe(
      page.value,
      limited.value,
      token
    );
    seriesAvaibles.value = response.series;
    totalPages.value = response.totalCount;
    showSeries.value = true;
  } catch (error) {
    console.error(error);
  }
};

const confirmInscribeSerie = (serie) => {
  serieSelected.value = serie;
  messageConfirmation.value =
    "Serie to enroll: " + serieSelected.value.nameSerie;
  showModalConfirmation.value = !showModalConfirmation.value;
};

const selectSerieToInscribe = async () => {
  showModalConfirmation.value = !showModalConfirmation.value;
  showModalLoading.value = true;
  try {
    const response = await enteredSeries(
      serieSelected.value._id,
      authStore.$state.token
    );
    if (response.result === "success") {
      getAvaibleSeries();
      notify({
        type: "success",
        title: "Success",
        text: `${response.message}`,
      });
    }
    showModalLoading.value = false;
  } catch (error) {
    console.error(error);
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value += 1;
    getAvaibleSeries();
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value -= 1;
    getAvaibleSeries();
  }
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.box-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  box-shadow: 0 0 5px white;
  padding-block: 1%;
  width: 90%;
  height: 20%;
  animation: fadeInScale 1s forwards, glow 1s, endGlow 5s;
}

.box-content {
  height: 75%;
  width: 90%;
  margin-block: 30px;
}

span {
  color: aliceblue;
  padding: 2%;
  text-align: justify;
}

@media screen and (max-width: 700px) {
  span {
    font-size: 80%;
  }
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes glow {
  0% {
    box-shadow: 0 0 5px white;
  }
  100% {
    box-shadow: 0 0 15px aliceblue, 0 0 20px aliceblue, 0 0 25px aliceblue;
  }
}

@keyframes endGlow {
  0% {
    box-shadow: 0 0 15px aliceblue, 0 0 20px aliceblue, 0 0 25px aliceblue;
  }
  100% {
    box-shadow: 0 0 5px white;
  }
}
</style>
