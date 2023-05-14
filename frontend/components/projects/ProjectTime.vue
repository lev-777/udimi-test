<script lang='ts'>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      time: {
        type: Number,
        required: true,
      },
    }
  }
</script>

<template>
  <div class='time-box flex flex-fill'>
    <div class='period'>{{ title }}</div>
    <div class='time flex flex-end ml-20 bold'>
      {{ secondsToTime(time) }}
    </div>
  </div>
</template>

<style lang='scss' scoped>
  .time-box {
    width: 100%;
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
