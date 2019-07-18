<template>
    <div class="search">
        <div class="search-field">
            <font-awesome-icon icon="search" size="xs" color="rgba(65,81,109,0.8)"/>
            <input type="text" class="form-control" placeholder="Search for Photo" v-model="searchQuery">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'searchComponent',
        props: {
            value: ''
        },
        data() {
            return {
                searchQuery: ''
            }
        },
        watch: {
            searchQuery: function(value) {
                this.$emit('input', value);
            }
        }
    }
</script>

<style lang="scss" scoped>
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
}
</style>