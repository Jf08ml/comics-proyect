<template>
    <div>
        <form class="form" enctype="multipart/form-data" @submit.prevent="submitData">
            <div class="div-form">
                <input  type="text" placeholder="Title *" required />
                <input type="text" placeholder="Description *" required />
            </div>
            <div class="div-form">
                <select class="">
                    <option>Animated</option>
                    <option>Real</option>
                </select>
                <input  type="text" placeholder="Wor" required />
            </div>
            <div class="div-form">
                <input  type="text" placeholder="Email *" required />
                <input  type="text" placeholder="Nickname *" required />
            </div>
            <button class="btn-primary">Save data</button>
        </form>
    </div>
</template>

<script setup>

</script>

<style scoped>
</style>