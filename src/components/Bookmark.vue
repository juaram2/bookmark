<template>
  <div>
    <div class="card-expansion">
      <div v-for="(bookmark, index) of bookmarks" :key="bookmark.id">
        <md-card >
          <md-card-media>
            <img :src="bookmark.thumbnail" alt="People">
          </md-card-media>

          <md-card-header>
            <div class="md-title">{{bookmark.title}}</div>
            <div class="md-subhead"><a :href="bookmark.url" target="_blank">{{bookmark.url}}</a></div>
          </md-card-header>

          <md-button class="btn-close md-icon-button" @click="delBookmark(bookmark, index)"><md-icon>close</md-icon></md-button>

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
    <!-- dialog -->
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
        showDialog: false,
        nextItem: 1
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
      delBookmark(bookmark, index) {
        axios.delete(baseURL + bookmark.id)
        .then(response => {
          this.bookmarks.splice(index, 1)
        });
      },

      // 스크롤시 로드
      // loadMore () {
      //   this.loading = true;
      //   setTimeout(e => {
      //     for (var i = 0; i < 6; bookmarks.length / 6) {
      //       this.bookmarks.push('Item ' + this.nextItem++);
      //     }
      //     this.loading = false;
      //   }, 200);
      // }
    },

    mounted() {
      // 스크롤 다하면 실행
      // const bookmarkWrap = document.querySelector('.card-expansion');
      // bookmarkWrap.addEventListener('scroll', e => {
      //   if(bookmarkWrap.scrollTop + bookmarkWrap.clientHeight >= bookmarkWrap.scrollHeight) {
      //     this.loadMore();
      //   }
      // });

      // this.loadMore();
    },

    // 다이얼로그 오픈시 스크롤 금지
    watch: {
      showDialog: function() {
        if(this.showDialog == true){
          document.documentElement.style.overflow = 'hidden'
          return
        }
        document.documentElement.style.overflow = 'auto'
      }
    },
  }
</script>

<style scoped>
  .card-expansion {
    overflow-y: auto; 
    width: 100%;
    height: calc(100vh - 50px);
    padding: 16px
  }
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