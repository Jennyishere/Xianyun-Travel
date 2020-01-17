<template>
  <div>
     <Header/>
    
    <nuxt />
    <Footer/>
  </div>
</template>
<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
export default {
    components: {
        Header,
        Footer
    }

}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}
em,i {
  font-style: normal;
}
</style>
