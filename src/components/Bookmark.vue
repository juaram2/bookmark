<template>
  <div class="page-container md-layout-column">
    bookmark
  </div>
</template>

<script>

export default {
  name: 'Bookmark'
  }
</script>

<style scoped>
  @import url('//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons');

  .page-container {
    min-height: 300px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .md-content {
    padding: 16px;
  }

  .md-layout-item{
    width: 50%;
  }
</style>