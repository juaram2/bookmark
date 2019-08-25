<template>
  <div class="md-layout md-gutter">
    <div class="imgWrap" v-for="(src, i) in num" :key="i">
      <div class="md-layout-item">
        <md-card>
          <md-card-media>
            <img :src="url + i" alt="images">
          </md-card-media>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data: () => ({
    num: 20,
    url: 'https://placeimg.com/200/200/people/'
  }),
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .imgWrap{
    width: 50%;
  }
  
</style>
