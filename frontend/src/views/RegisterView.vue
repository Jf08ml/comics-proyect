<template>
  <div class="container">
    <div class="content">

      <div class="content-title">
        <h1>Sign Up</h1>
      </div>

      <div class="content-form">
        <form @submit.prevent="onSubmit">

          <div class="form-register-div-input-nick">
            <input class="input-register-nick" :style="borderNicknameColor" v-model="nickname" placeholder="Nickname"
              type="text" required @input="validateNickname" @blur="validateInput('nickname')">
            <v-icon class="icon-register-nick" :name="nicknameValid.name" scale="1" :color="nicknameValid.color" />
          </div>
          <p>{{ showErrorInputNickname }}</p>

          <div class="form-div-input">
            <input class="input-form" v-model="email" placeholder="Email" type="text" name="nickname" required
              @blur="validateInput('email')">
          </div>
          <p>{{ showErrorInputEmail }}</p>

          <div class="form-register-div-input-nick">
            <input class="input-register-nick" id="password-field" v-model.trim="password" placeholder="Password"
              type="password" name="nickname" required @blur="validateInput('password')">
            <v-icon @click="showPassword" class="icon-register-nick" :name="iconeShowPassowrd" scale="1" color="grey" />
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


const nicknameValid = { name: 'si-superuser', color: 'grey' };
const borderNicknameColor = ref('')
const iconeShowPassowrd = ref('hi-eye');
const showPassword = () => {
  if (iconeShowPassowrd.value === 'hi-eye') {
    iconeShowPassowrd.value = 'hi-eye-off';
    document.getElementById("password-field").type = "text";
  } else {
    iconeShowPassowrd.value = 'hi-eye';
    document.getElementById("password-field").type = "password";

  }
}

const validateNickname = async () => {
  if (nickname.value.length >= 6) {
    const response = await authStore.searchNickname(nickname.value);
    if (response.value === true) {
      nicknameValid.name = 'bi-x-circle-fill';
      nicknameValid.color = 'red';
      borderNicknameColor.value = 'border: 2px solid red; box-shadow: 0px 0px 3px red';
    }
    if (response.value === false) {
      nicknameValid.name = 'bi-check-circle-fill';
      nicknameValid.color = '#afd85d';
      borderNicknameColor.value = 'border: 2px solid #afd85d; box-shadow: 0px 0px 3px #afd85d';
    }
  } else {
    nicknameValid.name = 'si-superuser';
    nicknameValid.color = 'grey';
    borderNicknameColor.value = '';

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
    if (error.result === 'errorEmail') {
      formMsgError.value = error.message;
    } else if (error.message === 'errorNickname') {
      formMsgError.value = error.message;
    }
    console.error(error)
  }
};

</script>

<style lang="scss">
@import '@/assets/scss/login/login.scss';
</style>

    