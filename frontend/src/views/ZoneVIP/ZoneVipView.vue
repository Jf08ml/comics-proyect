<template>
  <div class="content" :key="key">
    <div class="box-content">
      <span>VIP comics coming soon</span>
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

span {
  color: aliceblue;
  font-size: 7vh;
  white-space: nowrap;
  overflow: hidden;
  border-right: 0.15em solid aliceblue;
  width: 20ch; /* Ajusta este valor según el largo de tu texto */
  animation: typing 2s steps(40, end) forwards,
    blink-caret 0.75s step-end infinite;
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
    width: 20ch;
  } /* Ajusta este valor según el largo de tu texto */
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

@media screen and (max-width: 700px) {
  span {
    font-size: 2vh;
  }

  .box-content{
    height: 30%;
    width: 80%;
  }
}
</style>
