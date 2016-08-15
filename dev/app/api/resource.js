import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

const API_ROOT = '/';

export const getMusicList = Vue.resource(`${API_ROOT}api/music_more/{type}`);
