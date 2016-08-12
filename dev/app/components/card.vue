<template>
  <div class="m-card">
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
  data () {
    return {

    };
  }
};
</script>
