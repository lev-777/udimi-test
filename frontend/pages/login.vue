<script lang='ts'>
  import LoginForm from '~/components/auth/LoginForm.vue'
  export default {
    components: {
      LoginForm
    },
  }
</script>

<template>
  <div class='login-page'>
    <login-form></login-form>
  </div>
</template>

<style lang='scss' scoped>
  .login-page {
    width: 440px;
  }
</style>
