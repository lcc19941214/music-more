<template>
  <div class="g-header">
    <div class="g-title-wrapper">
      <h2>Music More</h2>
    </div>
    <div class="g-search-bar-wapper">
      <search-bar></search-bar>
    </div>
  </div>
  <div class="g-content">
    <div class="g-list-group-wrapper">
      <div class="list-group">
        <div class="m-list-wrapper">
        <netease-card></netease-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from '../components/searchBar.vue'
import neteaseCard from '../components/neteaseCard.vue'

export default {
  components: { searchBar, neteaseCard },
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
