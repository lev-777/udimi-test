<script lang='ts'>
  import { PropType } from '@vue/runtime-core'

  export default {
    props: {
      logo: {
        type: Object as PropType<string | null>
      }
    },

    setup() {
      const defaultLogoUrl = 'https://api.quwi.com/files/projects/3201-thumb.png?v=1683464770'

      return {
        defaultLogoUrl
      }
    }
  }
</script>

<template>
  <img :src='logo ? logo : defaultLogoUrl' alt='Project logo' />
</template>

<style lang='scss' scoped>
  img {
    width: 70px;
  }
</style>
