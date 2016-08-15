<template>
  <div class="m-qqmusic">
    <card>
      <div slot="header" class="header">
        <div class="logo-wrapper left">
          <img src="/images/qqmusic.png">
        </div>
        <h3>QQ音乐</h3>
      </div>
      <div slot="body">
        <div class="song-list-wrapper" v-if="songList.length > 0">
          <ul class="song-list">
            <li class="song-item clearfix" v-for="item in songList">
              <a
                class="song-name-label left"
                href="{{item.songLink}}"
                target="_blank"
                title="{{item.song}}">{{item.song}}</a>
              <a
                class="song-singer-label right"
                href="{{item.singerLink}}"
                target="_blank"
                title="{{item.singer}}">{{item.singer}}</a>
            </li>
          </ul>
        </div>
      </div>
    </card>
  </div>

</template>

<script>
import card from './card.vue'
import { getMusicList } from 'api/index'

export default {
  name: 'qqmusicCard',
  components: { card },
  data () {
    return {
      songList: []
    };
  },
  ready() {
    getMusicList('qqmusic')
      .then(response => {
        if (response.ok) {
          let { songList } = response.data;
          this.songList = songList.slice(0, 10);
        } else {

        }
      })
      .catch(err => {
        console.log(err);
      });
    }
};
</script>
