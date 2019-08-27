<template>
  <div class="card-expansion">
    <div v-for="bookmark of bookmarks" :key="bookmark.id">
      <md-card >
        <md-card-media>
          <img :src="bookmark.thumbnail" alt="People">
        </md-card-media>

        <md-card-header>
          <div class="md-title">{{bookmark.title}}</div>
          <div class="md-subhead"><a :href="bookmark.url" target="_blank">{{bookmark.url}}</a></div>
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
    width: calc(50% - 8px);
    margin: 4px;
    display: block;
    position: relative;
    float: left;
  }
  .md-card .md-subhead{
    font-size: 12px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .btn-close{
    position: absolute;
    top: 0;
    right: 0;
  }
</style>