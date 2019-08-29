<template>
  <div class="page-container md-layout-column">
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">My App</span>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">My App</span>
      </md-toolbar>

      <md-list v-for="(item, i) in items" :key="i">
        <md-list-item :to="item.link" exact @click="showNavigation = false">
          <md-icon>{{item.icon}}</md-icon>
          <span class="md-list-item-text">{{item.title}}</span>
        </md-list-item>
      </md-list>
    </md-drawer>

    <md-content>
      <router-view/>
    </md-content>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
      showNavigation: false,
      showSidepanel: false
    }),

    computed: {
      items() {
        return [
          {
            icon: 'home',
            title: 'Main',
            link: '/Main',
          },
          {
            icon: 'bookmark',
            title: 'Bookmark',
            link: '/Bookmark',
          },
        ]
      },
    }
  }
</script>

<style scoped>
  @import url('//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons');
  .page-container > .md-toolbar {
    position: fixed;
    top: 0;
    left: 0;
  }
  .page-container {
    min-height: 100vh;
    overflow: hidden;
    position: relative;
    padding-top: 50px;
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }

  .md-content {
    padding: 16px;
  }
</style>