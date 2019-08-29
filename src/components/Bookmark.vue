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


<!-- dialog -->
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>New Bookmark</md-dialog-title>
      
      <md-field>
        <label>Title</label>
        <md-input v-model="initial" placeholder="New Title"></md-input>
      </md-field>
      <md-field>
        <label>URL</label>
        <md-input v-model="initial" placeholder="http://url"></md-input>
      </md-field>
      <md-field>
        <label>Thumbnail</label>
        <md-input v-model="initial" placeholder="http://url/image"></md-input>
      </md-field>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-fab md-primary" @click="showDialog = true">
      <md-icon>add</md-icon>
    </md-button>
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
        showDialog: false
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
  .md-fab {
    position: fixed;
    bottom:20px; right:20px
  }

  .md-dialog {
    max-width: 300px;
    height: 370px;
    padding: 0 30px
  }
  .md-dialog-title{
    padding-left: 0;
  }
</style>