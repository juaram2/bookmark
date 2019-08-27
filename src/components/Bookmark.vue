<template>
  <div class="card-expansion">
    <div v-for="bookmark of bookmarks" :key="bookmark.id">
      <md-card >
        <md-card-media>
          <img :src="bookmarks.thumbnail" alt="People">
        </md-card-media>

        <md-card-header>
          <div class="md-title">{{bookmark.title}}</div>
          <div class="md-subhead">{{bookmark.url}}</div>
        </md-card-header>

        <md-button class="btn-close md-icon-button"><md-icon>close</md-icon></md-button>

      </md-card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Bookmark',
    
    data() {
      return {
        title: '',
        url: '',
        thumbnail: '',
        bookmarks: [],
      };
    },

    async created() {
      try {
        const res = await axios.get(`http://localhost:3000/bookmarks`)

        this.bookmarks = res.data;
      } catch(e) {
        console.error(e)
      }
    },
    // methods: {
    //   getBookmarks () {
    //     this.$http.get('http://localhost:3000/bookmarks')
    //     .then((res) => {
    //         this.bookmarks = res.data
    //     })
    //   }
    // },
    mounted(){
      this.getBookmarks()
    },
  }
  

</script>

<style scoped>
  .md-card {
    width: 50%;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    position: relative;
  }

  .btn-close{
    position: absolute;
    top: 0;
    right: 0;
  }
</style>