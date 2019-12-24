<script>
import Header from "./header";
import Footer from "./footer";

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {};
  }
};
</script>
<template>
  <div class="page-container">
    <Header />
    <div class="container">
      <div class="row">
        <div class="col col-xs-12">
          <slot />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
