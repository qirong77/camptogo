<template>
  <footer>
    <slot> </slot>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  position: fixed;
  background-color: white;
  width: 100%;
  height: 80px;
  bottom: 0;
  display: flex;
  justify-content: start;
  padding-left: 30px;
  align-items: center;
  z-index: 99;
  box-shadow: -1px -3px 5px 2px rgb(0 0 0 / 4%);
  .el-button {
    margin: 0 20px;
  }
}
</style>
