<template>
  <div class="g-header">
    <div class="g-title-wrapper">
      <h2>Music More</h2>
    </div>
    <div class="g-search-bar-wrapper">
      <search-bar></search-bar>
    </div>
  </div>
  <div class="g-content">
    <div class="g-list-group-wrapper">
      <div class="list-group">
        <div class="list-item-wrapper clearfix">
          <div class="list-item">
            <netease-card></netease-card>
          </div>
          <div class="list-item">
            <xiami-card></xiami-card>
          </div>
          <div class="list-item">
            <qqmusic-card></qqmusic-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from '../components/searchBar.vue'
import neteaseCard from '../components/neteaseCard.vue'
import xiamiCard from '../components/xiamiCard.vue'
import qqmusicCard from '../components/qqmusicCard.vue'

export default {
  components: { searchBar, neteaseCard, xiamiCard, qqmusicCard },
  data () {
    return {

    };
  },
  router: {
    data ({ to: { name } }) {
      console.log(name);
    }
  }
};
</script>
