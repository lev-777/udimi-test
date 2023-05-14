<script lang='ts'>
  import { useLoginForm } from '~/composables/auth/useLoginForm'

  export default {
    setup() {
      return {...useLoginForm()}
    }
  }
</script>

<template>
  <div class='form flex flex-center bg-white'>
    <form @submit.prevent='onSubmit'>
      <div class='title c-dark-red'>Login form</div>

      <div :class='["app-form-input", "w-full", "mb-20", {"has-error": emailError}]'>
        <input
          type='text'
          name='login'
          placeholder='Login'
          autocomplete='off'
          autofocus='autofocus'
          v-model='email'
          @blur='emailBlur'
        />
        <div class='error-container' v-if='emailError'>
          <small>{{ emailError }}</small>
        </div>
      </div>

      <div :class='["app-form-input", "w-full", "mb-20", {"has-error": passwordError}]'>
        <input
          type='password'
          name='password'
          placeholder='Password'
          v-model='password'
          @blur='passwordBlur'
        />
        <div class='error-container' v-if='passwordError'>
          <small>{{ passwordError }}</small>
        </div>
      </div>

      <button type='submit' class='submit-button bg-dark-red c-white w-full'>
        Sign In
      </button>
    </form>
  </div>
</template>

<style lang='scss' scoped>
  @import '@/assets/scss/app-form';

  .form {
    padding: 35px 40px 35px;
    border: 1px solid rgba(0,0,0,.11);
    box-shadow: 0 0 12px rgb(0 0 0 / 25%);
    border-radius: 15px;

    form {
      width: 100%;

      .title {
        margin-bottom: 20px;
        text-align: center;
        font-size: 1.6em;
      }

      .submit-button {
        height: 52px;
        text-transform: none;
        text-shadow: none;
        font-size: 18px;
        border-radius: 5px;
        font-weight: 400;
        border: none;
        cursor: pointer;
      }
    }
  }
</style>
