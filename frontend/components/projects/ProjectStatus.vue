<script lang='ts'>
  export default {
    props: {
      value: {
        type: Number,
        required: true,
      }
    },

    setup(props: {value: number}) {
      const textMap = ['Inactive', 'Active',]
      const classesMap = ['c-dark-red', 'c-green',]

      const text = ref(textMap[props.value])
      const className = ref(classesMap[props.value])

      return {
        className,
        text
      }
    }
  }
</script>

<template>
  <span :class='[className]'>{{ text }}</span>
</template>
