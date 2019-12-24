<script>
import Layout from '../_layout/default.layout'

export default {
  components: {
    Layout
  },
  data () {
    return {
      title: 'Home page title'
    }
  }
}
</script>

<template>
 <Layout>
    <h4>Home page {{title}}</h4>
 </Layout>
</template>
