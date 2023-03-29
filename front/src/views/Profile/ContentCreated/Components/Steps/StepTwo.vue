<template>
    <div>
      <form class="form" enctype="multipart/form-data" @submit.prevent="submitData">
        <div class="div-form">
          <input v-model="postInfo.title" type="text" placeholder="Title *" required />
          <input v-model="postInfo.description" type="text" placeholder="Description *" required />
        </div>
        <div class="div-form">
          <select v-model="postInfo.typeContent" class="">
            <option value="" selected disabled>Select content type</option>
            <option value="Animated">Animated</option>
            <option value="Real">Real</option>
          </select>
          <input v-model="postInfo.keywords" type="text" placeholder="Comma separated keywords *" required />
        </div>
        <button class="btn-primary">Save data</button>
      </form>
      {{  postInfo }}
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue'

  const props = defineProps({
    saveInfo: Function, 
  })
  
  const postInfo = ref({
    title: '',
    description: '',
    typeContent: '',
    keywords: '',
  })

  const submitData = () => {
    props.saveInfo(postInfo.value)
  }
  </script>
  
  <style scoped>
  </style>
  