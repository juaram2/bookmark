<template>
  <div>
    <div class="card-expansion" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="limit">
      <div v-for="bookmark of bookmarks" :key="bookmark.id" data-aos="slide-up" data-aos-offset="100" data-aos-easing="ease-out-back">
        <md-card >
          <md-card-media>
            <img :src="bookmark.thumbnail" alt="People">
          </md-card-media>

          <md-card-header>
            <div class="md-title">{{bookmark.title}}</div>
            <div class="md-subhead"><a :href="bookmark.url" target="_blank">{{bookmark.url}}</a></div>
          </md-card-header>

          <md-button class="btn-close md-icon-button" v-on:submit.prevent="delBookmark(index)" @click="delBookmark(bookmark, index) in bookmarks"><md-icon>close</md-icon></md-button>

        </md-card>
      </div>
    </div>

    <!-- dialog -->
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>New Bookmark</md-dialog-title>
      
      <md-field>
        <label>Title</label>
        <md-input v-model="title" placeholder="New Title"></md-input>
      </md-field>
      <md-field>
        <label>URL</label>
        <md-input v-model="url" placeholder="http://url"></md-input>
      </md-field>
      <md-field>
        <label>Thumbnail</label>
        <md-input v-model="thumbnail" placeholder="http://url/image"></md-input>
      </md-field>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false" v-on:click="addBookmark">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-fab md-primary" @click="showDialog = true">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
  import axios from 'axios';
  const baseURL = "http://localhost:3000/bookmarks/"

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
        const res = await axios.get(baseURL)
        this.bookmarks = res.data;
      } catch(e) {
        console.error(e)
      }
    },

    methods: {
      // 북마크 추가
      async addBookmark() {
        const res = await axios.post(baseURL, { id:'', title: this.title, url: this.url, thumbnail: this.thumbnail })
        this.bookmarks = [...this.bookmarks, res.data]
      },
      // 북마크 삭제
      delBookmark(bookmark, id) {
        axios.delete(baseURL + bookmark.id)
        .then(response => {
          this.bookmarks.splice(id, 1)
          // location.reload();
        });
      },

    },
  }
</script>

<style scoped>
  .card-expansion {overflow: hidden;}
  .md-card {
    width: calc(50% - 8px);
    height: 255.5px;
    margin: 4px;
    display: block;
    position: relative;
    float: left;
  }
  .md-card-media {
    width: 100%;
    height: 163.5px;
  }
  .md-card-media img {
    width: 100%;
    height: 100%;
    object-fit: cover
  }
  .md-card .md-subhead{
    font-size: 12px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .md-icon {
    color: #fff!important;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
  }
  .btn-close{
    position: absolute;
    top: 6px;
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