<template>
  <div class="card">
    <img :src="props.image" alt="Card image" class="card-img-top" />
    <div class="content-text">
      <div style="height: 70%">
        <h4>{{ props.title }}</h4>
      </div>
      <div style="height: 20%">
        <span>Views: {{ props.views }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  image: String,
  title: String,
  views: Number,
});
</script>

<style scoped>
h4 {
  padding: 2px;
  margin: 0px;
  color: aliceblue;
  font-size: 100%;
}

span {
  padding: 1px;
  margin: 0px;
  color: aliceblue;
  font-size: 90%;
}

@media (max-width: 600px) {
  h4 {
    font-size: 3vw;
  }

  span {
    font-size: 2vw;
  }
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  box-shadow: 0 0 5px #b81f59;
  width: 10%;
  height: 20%;
  background: #333;
}
.card-img-top {
  height: 75%;
  width: 100%;
  object-fit: cover;
}

.content-text {
  height: 25%;
  display: flex;
  flex-direction: column;
  text-align: center;
}
</style>
