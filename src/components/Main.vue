<template>
  <div class="md-layout md-gutter">
      <div class="md-layout-item" v-for="(item, i) in items" :key="i">
        <md-card>
          <md-card-media>
            <img :src="selectedImage" alt="images">
          </md-card-media>
        </md-card>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  bookmark(){
    return 
  },
  data () {
      return {
        images: [
          'http://via.placeholder.com/200x140',
          'http://via.placeholder.com/200x100'
        ],
        selectedImage: ''
      }
    },
    created () {
      const idx = Math.floor(Math.random() * this.images.length)
      this.selectedImage = this.images[idx]
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .md-layout-item{
    width: 50%;
  }
  
</style>
