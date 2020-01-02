<script>
export default {
  data() {
    return {
      copyTitle: 'EfficientTime © 2020 Niteco Ltd., All rights reserved.',
      version: '1.5.191021.175220'
    };
  }
};
</script>
<template>
  <footer class="text-center">
    <a
      href="https://niteco.efficienttime.com/"
      target="_blank"
      title="Niteco Efficient Time"
      class="text-muted"
    >
      <span>{{ copyTitle }}</span>
      <b>Version {{ version }}</b>
      &nbsp;
    </a>
  </footer>
</template>
<style lang="scss" scoped>
footer {
  position: fixed;
  z-index: 990;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px;
}
</style>
