<template>
  <div class="m-card" :style="cardStyle">
    <div class="u-card-header-wrapper">
      <div class="card-header">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="u-card-body-wrapper">
      <div class="card-body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    background: {
      type: String,
      default: '#ffffff'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      cardStyle: {
        backgroundColor: this.background,
        width: this.width
      }
    };
  }
};
</script>
