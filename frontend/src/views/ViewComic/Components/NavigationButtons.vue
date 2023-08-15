<template>
  <div>
    <button
      :class="showBack ? 'btn-navigation' : 'btn-navigation-blocked'"
      :disabled="!showBack"
      @click="emitBackComic"
    >
      «
    </button>
    <button class="btn-navigation" @click="emitOpenSerie">
      <v-icon name="hi-information-circle" />
    </button>
    <button
      :class="showNext ? 'btn-navigation' : 'btn-navigation-blocked'"
      :disabled="!showNext"
      @click="emitNextComic"
    >
      »
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  showBack: Boolean,
  showNext: Boolean,
});

const emit = defineEmits(['next-comic', 'back-comic', 'open-serie']);

const emitNextComic = () => emit('next-comic');
const emitBackComic = () => emit('back-comic');
const emitOpenSerie = () => emit('open-serie');

</script>

<style scoped>
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

.btn-navigation:hover {
  box-shadow: 0 0 5px#ffffff;
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

  .btn-navigation-blocked {
    width: 10%;
  }
}
</style>