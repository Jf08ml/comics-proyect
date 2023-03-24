<template>
    <div class="container-form-user-data">
        <form class="form" enctype="multipart/form-data" @submit.prevent="submitData">
            <div class="div-form">
                <input v-model="userInformation.name" type="text" placeholder="Full name *" required/>
                <input v-model="userInformation.lastName" type="text" placeholder="Full last name *" required/>
            </div>
            <div class="div-form">
                <input v-model="userInformation.country" type="text" placeholder="Country *" required/>
                <input v-model="userInformation.city" type="text" placeholder="City *" required/>
            </div>
            <div class="div-form">
                <input v-model="userInformation.email" type="text" placeholder="Email *" required/>
                <input v-model="userInformation.nickname" type="text" placeholder="Nickname *" required/>
            </div>
                <button class="btn-primary">Save data</button>
        </form>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { notify } from "@kyvg/vue3-notification";

const props = defineProps({
    onSubmitUserInformation: Function,
    userData: Object
})

const userInformation = ref(props.userData);

const submitData = async () => {
    try {
        const response = await props.onSubmitUserInformation(userInformation);
        
        if (response.result == "success") {
            notify({
                type: "success",
                title: "Success",
                text:"Updated information",
            });
        } else if (response.result == "errorUser") {
            notify({
                type: "error",
                text: "Invalid password",
            });
        }
    } catch (error) {
        console.error(error)
    }
}
</script>

<style scoped>
.container-form-user-data {
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 0 3px gray;
    width: 90%;
    margin: auto;
    margin-bottom: 8px;
}
</style>