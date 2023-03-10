<template>
  <div class="container">
    <div class="content">
      <div class="content-title">
        <h1>Log in</h1>
      </div>
      <div class="content-form">
        <form @submit.prevent="onSubmit">
          <input v-model="email" placeholder="Email" type="text" required>
          <p v-if="email == ''" style="color: red;">Este campo es requerido</p>

          <input v-model="password" placeholder="Password" type="password" required>
          <p v-if="password == ''" style="color: red; margin-bottom: 8px;">Este campo es requerido</p>
          <router-link  to="/recuperar">
            <span>¿Olvidaste tu contraseña?</span>
          </router-link>
          <p v-if="showMsgError" style="color: red; margin-top: 5px;">{{showMsgError}}</p>

          <button type="submit" class="button-primary">Login</button>


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
const showMsgError = ref('')

const onSubmit = async () => {
  try {
    await authStore.login(email.value, password.value);
    router.push("/realcomics");
  } catch (error) {
    if(error.message === 'Invalid credentials'){
      showMsgError.value = "Email o contraseña incorrecta"
    } else if( error.message === "Non-existent user"){
      showMsgError.value = "No existe un usuario registrado"
    }
    console.error(error)
  }
};

</script>
  