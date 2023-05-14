<script lang='ts'>
  export default {
    emits: ['close'],
    props: {
      title: {
        type: String
      },
      titleCenter: {
        type: Boolean,
        default: false
      }
    },
  }
</script>

<template>
  <div class='modal-backdrop' @click='$emit("close")'></div>
  <div class='modal'>
    <div class='header flex flex-end'>
      <div class="close clickable" @click='$emit("close")'>X</div>
    </div>

    <slot />
  </div>
</template>
