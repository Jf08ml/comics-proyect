<template>
    <div align="center">
        <div>
            <h1>{{ serie.nameSerie }}</h1>
        </div>
        <div>
            <img :src="serie.frontPage" />
        </div>
        <div>

        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useComicStore } from '@/store/comic';
import { useRoute } from 'vue-router';
// import cardDefault from '@/components/Cards/cardsDefault.vue';
// import router from '@/router';

const comicStore = useComicStore();
const route = useRoute();

let serie = ref({});
let orderComics = ref([])
const idComic = route.params;

onBeforeMount(async () => {
    try {
        const response = await comicStore.getUserSerie(idComic.id);
        serie.value = response;
        orderComics.value.push(serie.value._id)
        console.log(serie.value)
    } catch (error) {
        console.log(error);
    }

});


</script>

<style scoped>

</style>