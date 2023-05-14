<template>
  <main>
    <div class='container'>
      <slot></slot>
    </div>
  </main>
</template>

<style lang='scss' scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 45px);

    @media (max-width: 500px) {
      padding: 0 15px;
    }
  }
</style>
