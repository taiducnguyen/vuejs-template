<script>
import Header from './header.vue';
import Footer from './footer.vue';
import Sidebar from './sidebar.vue';

export default {
  components: {
    Header,
    Footer,
    Sidebar
  },
  data() {
    return {};
  },
  computed: {
    expandedSidebar() {
      return this.$store.state.layout.expandedSidebar;
    }
  }
};
</script>
<template>
  <div class="page-container">
    <Header />
    <div class="page-wrapper">
      <div class="navigation" :class="{ collapsed: expandedSidebar }">
        <Sidebar />
      </div>
      <div class="main-content" :class="{ expanded: expandedSidebar }">
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
@import 'src/theme/components/_variables.scss';
.page-wrapper {
  margin-top: 55px;
}
.navigation {
  background: $background-color-white;
  height: 100vh;
  padding: 0;
  vertical-align: top;
  width: 280px;
  box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  position: fixed;
  left: 0;
  bottom: 0;
  top: 55px;
  padding-bottom: 4em;
  z-index: 1000;
  overflow: hidden;
  &.collapsed {
    max-width: 83px;
    width: 83px;
    .navbar .navbar-nav li > a {
      max-width: 60px;
      padding-left: 0;
    }
  }
}
.main-content {
  min-height: 100vh;
  margin-left: 280px;
  margin-top: 55px;
  padding: 20px;
  &.expanded {
    margin-left: 83px;
  }
}
</style>
