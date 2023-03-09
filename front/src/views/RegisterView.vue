<template>
  <div class="container">
    <div class="content">
      <div class="content-title">
        <h1>Sign Up</h1>
      </div>
      <div class="content-form">
        <form @submit.prevent="onSubmit">
          <input v-model="nickname" placeholder="Nickname" type="text" required @blur="validateInput('nickname')">
          <p style="color: red;">{{ showErrorInputNickname }}</p>

          <input v-model="email" placeholder="Email" type="text" name="nickname" required @blur="validateInput('email')">
          <p style="color: red;">{{ showErrorInputEmail }}</p>

          <input v-model="password" placeholder="Password" type="password" name="nickname" required
            @blur="validateInput('password')">
          <p style="color: red;">{{ showErrorInputPassword }}</p>
          <p v-if="formMsgError" style="color: red; margin-top: 5px;">{{ formMsgError }}</p>

          <button :disabled="disabled" type="submit" class="button-primary" @click="checkFormValidity">Register</button>

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

const nickname = ref(null);
const email = ref(null);
const password = ref(null);
const formMsgError = ref(null)

const disabled = ref(false)

const showErrorInputNickname = ref(null);
const showErrorInputEmail = ref(null);
const showErrorInputPassword = ref(null)

const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

const validateInput = (name) => {
  formMsgError.value = "";
  switch (name) {
    case 'nickname':
      if (!nickname.value || nickname.value == '') {
        showErrorInputNickname.value = "Required";
      } else if (nickname.value.length < 6) {
        showErrorInputNickname.value = "Minimum 6 character";
      } else {
        showErrorInputNickname.value = "";
      }
      break;
    case 'email':
      if (!email.value || email.value == '') {
        showErrorInputEmail.value = "Nickname is required";
      } else if (!emailRegex.test(email.value)) {
        showErrorInputEmail.value = "Email must be valid";
      } else {
        showErrorInputEmail.value = "";
      }
      break;
    case 'password':
      if (!password.value || password.value == '') {
        showErrorInputPassword.value = "Password is required";
      } else if (password.value.length < 6) {
        showErrorInputPassword.value = "Password must be at least 6 characters long";
      } else {
        showErrorInputPassword.value = "";
      }
      disabled.value = !!showErrorInputNickname.value || !!showErrorInputEmail.value || !!showErrorInputPassword.value;
  }
}

const checkFormValidity = () => {
  if (showErrorInputNickname.value || showErrorInputEmail.value || showErrorInputPassword.value) {
    disabled.value = true;
    formMsgError.value = "Please correct the errors in the form";
  } else {
    disabled.value = false;
    formMsgError.value = '';
  }
}

const onSubmit = async () => {
  formMsgError.value = ''
  try {
    await authStore.signup(nickname.value, email.value, password.value);
    router.push("/realcomics");
  } catch (error) {
    if (error.message === 'Email already exists') {
      formMsgError.value = "Email exists"
    } else if (error.message === 'Nickname already exists') {
      formMsgError.value = "Nickname exists"
    }
    console.error(error)
  }
};

</script>
    