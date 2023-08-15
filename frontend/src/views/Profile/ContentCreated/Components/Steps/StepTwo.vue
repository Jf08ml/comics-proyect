<template>
  <div>
    <form
      class="form"
      enctype="multipart/form-data"
      @submit.prevent="submitData"
    >
      <div class="div-form">
        <input
          v-model="postInfo.title"
          type="text"
          placeholder="Title *"
          required
        />
        <input
          v-model="postInfo.description"
          type="text"
          placeholder="Description *"
          required
        />
      </div>
      <div class="div-form">
        <select v-model="postInfo.typeContent" class="" required>
          <option value="" selected disabled>Select content type</option>
          <option value="Animated">Animated</option>
          <option value="Real">Real</option>
        </select>
        <input
          v-model="postInfo.artist"
          type="text"
          placeholder="Original artist *"
          required
        />
      </div>
      <div class="div-form">
        <input
          id="input"
          type="text"
          placeholder="Keywords separated for comma *"
          v-model="text"
          @keydown.space="addChip"
        />
      </div>
      <div class="chips">
        <div v-for="(chip, index) in postInfo.chips" :key="index" class="chip">
          {{ chip }}
          <button class="remove" @click="removeChip(index)">&times;</button>
        </div>
      </div>
      <button class="btn-primary">Save data</button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  saveInfo: Function,
  infoComic: Object,
});

const postInfo = ref({
  title: props.infoComic.nameSerie,
  description: props.infoComic.description,
  typeContent: "",
  artist: props.infoComic.artist,
  chips: props.infoComic ? [] : props.infoComic.keywords,
});
const text = ref("");

const addChip = () => {
  if (text.value.trim() !== "") {
    postInfo.value.chips.push(text.value.trim());
    text.value = "";
  }
};

const removeChip = (index) => {
  postInfo.value.chips.splice(index, 1);
};

const submitData = () => {
  props.saveInfo(postInfo.value);
};
</script>

<style scoped>
.chips {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  gap: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f5f5f5;
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

.chip button.remove {
  border: none;
  background: none;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}
</style>
