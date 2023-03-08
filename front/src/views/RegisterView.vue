<template>
    <div class="container">
      <div class="content">
        <div class="content-title">
          <h1>Sign Up</h1>
        </div>
        <div class="content-form">
          <form @submit.prevent="onSubmit">
            <input v-model="nickname" placeholder="Nickname" type="text" required>
            <p v-if="nickname == ''" style="color: red;">Este campo es requerido</p>

            <input v-model="email" placeholder="Email" type="text" required>
            <p v-if="email == ''" style="color: red;">Este campo es requerido</p>
  
            <input v-model="password" placeholder="Password" type="password" required>
            <p v-if="password == ''" style="color: red;">Este campo es requerido</p>
            <p v-if="showMsgError" style="color: red; margin-top: 5px;">{{showMsgError}}</p>
  
            <button type="submit" class="button-primary">Register</button>
  
          </form>
        </div>
      </div>
    </div>
  </template>
    
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import '@/assets/scss/login/login.scss';
  import { useAuthStore } from '@/store/auth';
  
  const router = useRouter();
  const authStore = useAuthStore();
  
  const email = ref('juanf@example.com');
  const password = ref('contraseña123');
  const nickname = ref(null);
  const showMsgError = ref('')
  const onSubmit = async () => {
    try {
      await authStore.signup(email.value, password.value);
      router.push("/realcomics");
    } catch (error) {
      if(error.message === 'Email already exists'){
      showMsgError.value = "Email ya registrado"
    }
      console.error(error)
    }
  };
  
  </script>
    