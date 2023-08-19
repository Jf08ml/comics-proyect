<template>
  <div class="content" :key="key">
    <div class="box-content">
      <span class="animated-text">
        To earn money you must upload a new comic from here which will be
        subject to review. The dynamic to win will be in a time of 20 days, the
        5 most viewed comics will win a sum of money according to the views made
        between the 5 comics.
      </span>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const key = ref(0);

watch(
  () => route.params.type,
  () => {
    key.value++;
  }
);
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

.box-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  box-shadow: 0 0 5px white;
  width: 70%;
  height: 50%;
  animation: fadeInScale 1s forwards, glow 1.5s infinite alternate;
}

.animated-text {
  color: aliceblue;
  font-size: 1vh;
  white-space: pre-line; /* Mostrará los saltos de línea */
  border-right: 0.15em solid aliceblue;
  width: 20ch;
  animation: typing 10s steps(40, end) forwards, blink-caret 0.75s step-end infinite;
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

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: aliceblue;
  }
}
</style>
