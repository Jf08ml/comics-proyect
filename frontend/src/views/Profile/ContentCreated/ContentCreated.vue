<template>
  <div class="containerContent">
    <div class="created-content">
      <span class="move-animation">Earn money! →</span>
      <button @click="showModal" class="btn-create-content">
        Create content
      </button>
    </div>
    <div class="post-content">
      <div class="post-created">
        <comicsCreated ref="refComicsCreated" @show-modal="showModal" />
      </div>
    </div>
    <Transition>
      <ModalDefault v-if="closeOrOpen" :onShowModal="showModal">
        <StepNextStep
          :isFunctionRunning="isFunctionRunning"
          :currentStep="currentStep"
          :nextStep="nextStep"
          :prevStep="prevStep"
          :steps="steps"
          :onShowModal="showModal"
          :sendPost="sendPost"
          :addComicPart="addComicPart"
        />
      </ModalDefault>
    </Transition>
  </div>
</template>

<script setup>
import { ref, toRaw } from "vue";
import axios from "axios";
import { useComicStore } from "@/store/comic";
import { notify } from "@kyvg/vue3-notification";

import ModalDefault from "@/components/Modals/ModalDefault.vue";
import StepNextStep from "./Components/StepNextStep.vue";
import comicsCreated from "./Components/comicsCreated.vue";

const comicStore = useComicStore();

const closeOrOpen = ref(false);
const isFunctionRunning = ref(false);
const addComicPart = ref(null);
const currentStep = ref(0);
const refComicsCreated = ref(null);
const steps = [
  {
    title: "Upload photos",
    description: "Upload your post and earn money according to the views.",
  },
  { title: "Post Information", description: "Add details and tags." },
  { title: "Preview", description: "This is what your post will look like." },
];

const reloadSeries = () => {
  refComicsCreated.value.fetchSeries();
};

const showModal = (comic) => {
  closeOrOpen.value = !closeOrOpen.value;
  addComicPart.value = comic;
};

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const sendPost = async (uploadedImages, postInfoSaved) => {
  const urlImageSend = ref([]);

  isFunctionRunning.value = true;

  for (let i = 0; i < toRaw(uploadedImages.length); i++) {
    const formData = new FormData();
    formData.append("image", uploadedImages[i].imagefile);
    formData.append("key", "0f13a40a6bc24a6565e327d5b4b5e26c");
    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData
    );
    const userPhotoUrl = response.data.data.url;
    urlImageSend.value.push(userPhotoUrl);
  }

  const postComplete = {
    title: postInfoSaved.title,
    imagesPost: toRaw(urlImageSend.value),
    serie: addComicPart.value ? addComicPart.value._id : "",
  };

  const serie = {
    title: postInfoSaved.title,
    description: postInfoSaved.description,
    artist: postInfoSaved.artist,
    typeContent: postInfoSaved.typeContent,
    keywords: postInfoSaved.chips,
  };

  if (postComplete.serie == undefined) {
    try {
      const response = await comicStore.seriePost(serie);
      postComplete.comicPart = response.serie_id;

      if (response.result === "success") {
        try {
          const response = await comicStore.comicPost(postComplete);
          const comicLoaded = response.comic;
          currentStep.value = 0;

          if (response.result === "success") {
            try {
              const response = await comicStore.putComic(comicLoaded);
              if (response.result === "success") {
                notify({
                  type: "success",
                  title: "Success",
                  text: "Post uploaded",
                });
              }
            } catch (error) {
              console.error(error);
            }
          }
          showModal();
          isFunctionRunning.value = false;
          reloadSeries();
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const response = await comicStore.comicPost(postComplete);
      const comicLoaded = response.comic;
      currentStep.value = 0;
      if (response.result === "success") {
        try {
          const response = await comicStore.putComic(comicLoaded);
          if (response.result === "success") {
            notify({
              type: "success",
              title: "Success",
              text: "Post uploaded",
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
      showModal();
      isFunctionRunning.value = false;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.containerContent {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.created-content {
  height: 8%;
  width: 80%;
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 3px gray;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

@media screen and (max-width: 700px) {
  .created-content {
    width: 80%;
    height: 5%;
    transition: all 0.5s ease-in-out;
  }
}

.move-animation {
  font-size: 17px;
  animation: move 1s ease-in-out infinite alternate, color 2s linear infinite;
}

@keyframes move {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(30%);
  }
}

@keyframes color {
  0% {
    color: red;
  }

  25% {
    color: blue;
  }

  50% {
    color: green;
  }

  75% {
    color: purple;
  }

  100% {
    color: orange;
  }
}

@media screen and (max-width: 700px) {
  .move-animation {
    font-size: 17px;
    transition: all 0.5s ease-in-out;
  }
}

.btn-create-content {
  margin-top: 5px;
  border-radius: 10px;
  border: none;
  padding: 6px;
  background-color: #b81f59;
  margin: 10px;
  color: aliceblue;
  cursor: pointer;
  margin-left: 40px;
}

.btn-create-content:hover {
  transition: 0.2s ease;
  box-shadow: 0 0 8px #b81f59;
}

@media screen and (max-width: 900px) {
  .btn-create-content {
    font-size: 12px;
    transition: all 0.5s ease-in-out;
  }
}

.post-content {
  height: 85%;
  width: 90%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 3px gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

@media screen and (max-width: 700px) {
  .post-content {
    width: 90%;
    height: 85%;
    transition: all 0.5s ease-in-out;
  }
}

.post-created {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 95%;
  height: 90%;
}
</style>
