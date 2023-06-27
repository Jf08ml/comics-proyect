<template>
    <div align="center" v-if="comicLoaded">
        <div>
            <h1> {{ comic.title }}</h1>
        </div>
        <div>
            <button>«</button>
            <button>»</button>
        </div>
        <div class="content-images" v-for="(image, index) in comic.imagesPost" :key="index">
            <div>
                <img style="box-shadow: 0 0 5px #b81f59;" :src="image" />
            </div>
        </div>
        <div style="color:whitesmoke">
            <div>
                <h3>Other comics</h3>
            </div>
            <div style="display: flex; flex-wrap: wrap; justify-content: center;">
                <div v-for="img in azarComics" :key="img._id"
                    style="flex-basis: 25%; height: 220px; margin: 10px; border: 1px solid white">
                    <div style="width: 100%; height: 100%;" @click="openComic(img._id)">
                        <cardDefault :title="img.title" :description="img.description"
                            :image="img.imagesPost[0]" :views="img.views" />
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useComicStore } from '@/store/comic';
import { useRoute } from 'vue-router';
import cardDefault from '@/components/Cards/cardsDefault.vue';
import router from '@/router';

const comicStore = useComicStore();
const route = useRoute();

let comic = ref({});
let orderComics = ref([])
let azarComics = ref({})
let comicLoaded = ref(false);
const idComic = route.params;

onBeforeMount(async () => {
        try {
            const response = await comicStore.getUserComic(idComic.id);
            comic.value = response;
            orderComics.value.push(comic.value._id)
            try {
                const response = await comicStore.getAzarComics();
                azarComics.value = response;
                comicLoaded.value = true;
            } catch (error) {
                console.error(error)
            }
        } catch (error) {
            console.error(error);
        }
});

const openComic = (comic) => {
    router.push(`/viewcomic/${comic}`)
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

watch(() => route.params.id, async (newIdComic) => {
    idComic.value = newIdComic;
    try {
        const response = await comicStore.getUserComic(idComic.value);
        comic.value = response;
        try {
            const response = await comicStore.getAzarComics();
            azarComics.value = response;
            comicLoaded.value = true;
        } catch (error) {
            console.error(error)
        }
    } catch (error) {
        console.error(error);
    }
});

</script>

<style scoped>
.content-images {
    width: 100%;
    margin-block: 10px;
}

img {
    width: 50%;
    height: 70%;
    box-shadow: 0 0 5px gainsboro;
}

@media screen and (max-width: 700px) {
    img {
        width: 90%;
        height: 100%;
        transition: all 0.5s ease-in-out;
    }
}
</style>
