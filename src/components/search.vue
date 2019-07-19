<template>
  <div class="search">
    <div class="search-field" v-if="searchText == ''">
      <font-awesome-icon icon="search" size="xs" color="rgba(65,81,109,0.8)"/>
      <input type="text" class="form-control" placeholder="Search for Photo" v-model="searchQuery">
    </div>
    <div class="search-result" v-else> 
      <transition name="fade">
        <h3 class="d-inline-block"> 
          <p v-if="!LOADING_STATUS && NO_RESULT">No Results found for </p>
          <p v-if="LOADING_STATUS">Searching for </p>
          <p v-if="!LOADING_STATUS && !NO_RESULT">Search Results for </p>
          &nbsp;{{ searchText }} 
        </h3>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'searchComponent',
  props: [ "searchText"],
  data() {
    return {
      searchQuery: '',
    }
  },
  watch: {
    searchQuery: function(value) {
      this.$emit('input', value);
    }
  },
  computed: {
    ...mapGetters(['LOADING_STATUS', 'NO_RESULT'])
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.search {
  min-height: 250px;
  background: #dde2e9;
  display: flex;
  justify-content: center;
  align-items: center;
  .search-field {
    padding: 30px;
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    position: relative;
    svg {
      position: absolute;
      top: 46px;
      left: 45px;
    }
    input {
      width: 100%;
      height: 45px;
      padding-left: 50px;
      font-size: 13px;
      color: rgba(65,81,109,1);
      border: transparent;
      &:focus {
        box-shadow: 0 0 0 0.3px rgb(65,81,109);
      }
    }
  }
  .search-result {
      display: block;
      padding: 30px;
      margin: 0 auto;
      text-align: left;
      max-width: 1200px;
      width: 100%;
      color: #6d7b91;
      p {
        color: #253858;
        display: inline-block;
      }
  }
}
</style>