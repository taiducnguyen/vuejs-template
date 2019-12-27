<script>
import Header from './header.vue'
import Footer from './footer.vue'
import Sidebar from './sidebar.vue'

export default {
  components: {
    Header,
    Footer,
    Sidebar
  },
  data() {
    return {};
  }
};
</script>
<template>
  <div class="page-container">
    <Header />
    <div class="page-wrapper">
      <div class="nagivation">
        <Sidebar />
      </div>
      <div class="main-content">
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>
