<template>
  <div class="m-netease">
    <card v-ref:card>
      <div slot="header" class="header">
        <div class="logo-wrapper left">
          <img src="/images/netease.png">
        </div>
        <h3>网易云音乐</h3>
      </div>
      <div slot="body">
        <div class="song-list-slide-wrapper" v-if="listGroup.length > 0">
          <div class="song-list-slide clearfix">
            <ul class="song-list" v-for="list in listGroup">
              <li class="song-item" v-for="item in list">
                <a
                  class="song-name-label"
                  href="{{item.songLink}}"
                  target="_blank"
                  title="{{item.song}}">{{item.song}}</a>
              </li>
            </ul>
          </div>
          <div class="song-list-slide-buttons">
            <i class="slide-btn current"></i>
            <i class="slide-btn"></i>
            <i class="slide-btn"></i>
          </div>
        </div>
      </div>
    </card>
  </div>

</template>

<script>
import card from './card.vue'
import { getMusicList } from 'api/index'

export default {
  name: 'neteaseCard',
  components: { card },
  data () {
    return {
      listGroup: [],
    };
  },
  ready() {
    getMusicList('netease')
      .then(response => {
        if (response.ok) {
          let { songList } = response.data;
          this.listGroup = songList;
          setTimeout(() => {
            this.shiftSlide();
          }, 10);
        } else {

        }
      }, err => {
        console.log(err);
      });
  },
  methods: {
    shiftSlide: function () {
      let btns = [...this.$el.querySelectorAll('.song-list-slide-buttons i')];
      let slide = this.$el.querySelector('.song-list-slide');
      btns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
          btns.forEach(v => {v.classList.remove('current')});
          btn.classList.add('current');
          slide.style.marginLeft = idx * -100 + '%';
        }, false);
      });
    }
  }
}
</script>
