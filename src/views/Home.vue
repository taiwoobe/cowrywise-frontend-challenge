<template>
  <div class="home">
    <photoList></photoList>
    <footer-component></footer-component>
  </div>
</template>

<script>
// @ is an alias to /src
import photoList from '@/components/photo-list.vue'
import footerComponent from '@/components/footer.vue'

export default {
  name: 'home',
  components: {
    photoList, footerComponent
  }
}
</script>
