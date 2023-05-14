<script lang='ts'>
  import Navbar from '~/components/TheNavbar.vue'
  import { Ref } from 'vue'

  export default {
    components: { Navbar },

    setup() {
      const hasCommonError: Ref<boolean> = ref(false)
      const commonErrorText: Ref<string> = ref('')

      const commonErrorHandler = async (payload: {errorText: string}) => {
        hasCommonError.value = true
        commonErrorText.value = payload.errorText
      }

      return {
        hasCommonError,
        commonErrorText,
        commonErrorHandler,
      }
    }
  }
</script>

<template>
  <div>
    <navbar></navbar>

    <main>
      <div class='common-error' v-if='hasCommonError'>
        <div class='error-text'><span>{{ commonErrorText }}</span></div>
      </div>

      <div class='container'>
        <nuxt-page @hasCommonError='commonErrorHandler'></nuxt-page>
      </div>
    </main>
  </div>
</template>

<style lang='scss' scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .common-error {
    background: #c44512;
    color: #fff;
    min-height: 50px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    .error-text {
      max-width: 500px;
      color: white;
      font-size: 1rem;
    }
  }
</style>
