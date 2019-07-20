<template>
  <div class="home">
    <search-component v-model="searchQuery" :searchText="SEARCH_STRING"> </search-component>
    <photo-component></photo-component>
    <footer-component></footer-component>
  </div>
</template>

<script>
  import searchComponent from '@/components/search.vue'
  import photoComponent from '@/components/photo-component.vue'
  import footerComponent from '@/components/footer.vue'
  import debounce from '../util/debounce'
  import { mapGetters } from 'vuex'

export default {
  name: 'home',
  components: { searchComponent, photoComponent, footerComponent },
  data() {
    return {
      searchQuery: ''
    }
  },
  watch: {
    searchQuery: debounce(function() {
      this.$store.dispatch('searchedPhotos', this.searchQuery);
    }, 1000)
  },
  computed: {
    ...mapGetters(['SEARCH_STRING'])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../styles/styles.scss';

</style>
