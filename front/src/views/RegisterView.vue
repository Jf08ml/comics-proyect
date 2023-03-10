<template>
  <div class="container">
    <div class="content">
      <div class="content-title">
        <h1>Sign Up</h1>
      </div>
      <div class="content-form">
        <form @submit.prevent="onSubmit">

          <div class="form-register-div-input-nick">
            <input class="input-register-nick" :style="{border: '2px solid' + nicknameValid.color}" v-model="nickname" placeholder="Nickname" type="text" required
              @input="validateNickname" @blur="validateInput('nickname')">
            <v-icon class="icon-register-nick" :name="nicknameValid.name" scale="1" :color="nicknameValid.color" />
            <!-- <v-icon v-if="showIconNicknameInvalid" class="icon-register-nick" name="bi-x-circle-fill" scale="1" color="red" /> -->
          </div>
          <p>{{ showErrorInputNickname }}</p>

          <div class="form-register-div-input">
            <input class="input-register" v-model="email" placeholder="Email" type="text" name="nickname" required
              @blur="validateInput('email')">
          </div>
          <p>{{ showErrorInputEmail }}</p>

          <div class="form-register-div-input">
            <input class="input-register" v-model="password" placeholder="Password" type="password" name="nickname"
              required @blur="validateInput('password')">
          </div>
          <p>{{ showErrorInputPassword }}</p>

          <p v-if="formMsgError" style="margin-top: 5px;">{{ formMsgError }}</p>

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

const nickname = ref('');
const email = ref('');
const password = ref('');
const formMsgError = ref('')

const disabled = ref(false)

const showErrorInputNickname = ref('');
const showErrorInputEmail = ref('');
const showErrorInputPassword = ref('')

const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;


const nicknameValid = { name: '', color: ''};

const validateNickname = async () => {
  if (nickname.value.length >= 6) {
    const response = await authStore.searchNickname(nickname.value);
    if (response.value === true) {
      nicknameValid.name = 'bi-x-circle-fill';
      nicknameValid.color = 'red';
    }
    if (response.value === false) {
      nicknameValid.name = 'bi-check-circle-fill';
      nicknameValid.color = '#afd85d';
    }
  } else {
    nicknameValid.name = '';
    nicknameValid.color = '';

  }
}

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
        showErrorInputEmail.value = "Email is required";
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

<style></style>

    