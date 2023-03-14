<template>
<div> 
    <form class="form" enctype="multipart/form-data" @submit.prevent="submitData">
                <div class="div-form">
                    <input v-model="userInformation.name" type="text" placeholder="Full name *" />
                    <input v-model="userInformation.lastName" type="text" placeholder="Full last name *" />
                </div>
                <div class="div-form">
                    <input v-model="userInformation.country" type="text" placeholder="Country *" />
                    <input v-model="userInformation.city" type="text" placeholder="City *" />
                </div>
                <div class="div-form">
                    <input v-model="userInformation.nickname" type="text" placeholder="Nickname *" />
                    <input v-model="userInformation.email" type="text" placeholder="Email *" />
                </div>
                <div>
                    <button>Save data</button>
                </div>
            </form>
</div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
const props = defineProps({
    onSubmit: Function,
    userData: Object
})

const userInformation = ref(props.userData);

const submitData =() => {
    props.onSubmit(userInformation);
}
</script>

<style scoped>

</style>