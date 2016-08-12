<template>
  <div class="m-netease">
    <card>
      <h3 slot="header">网易云音乐</h3>
      <div slot="body">hello music</div>
    </card>
  </div>

</template>

<script>
import card from './card.vue'

export default {
  name: 'neteaseCard',
  components: { card },
  data () {
    return {

    };
  }
};
</script>

<style lang="css" scoped>
</style>