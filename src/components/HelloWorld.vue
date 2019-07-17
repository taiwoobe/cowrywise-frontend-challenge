<template>
  <div class="container">
    <div class="search">
      <div class="search-field">
        <input type="text" class="form-control" placeholder="Search for Photo">
      </div>
    </div>
    <div class="wrapper"> 
      <div class="masonry">
        <div class="masonry-item" v-for="photo in photos" :key="photo.id">
          <img :src="photo.urls.small" class="img-responsive" :alt="photo.alt_description"/>
          <div class="photo-details">
            <h3>{{ photo.user.name }}</h3>
            <p>{{ photo.user.location }}</p>
          </div>
        </div>
      </div>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors" :key="error.id">
          {{error.message}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { HTTP, unsplash } from '../config/api'
  export default {
  name: 'HelloWorld',
  data() {
    return {
      photos: [],
      errors: [],
      defaultQuery: 'african',
      resultPerPage: 8
    }
  },
  created() {
    this.getPhotos();
  },
  methods: {
    getPhotos() {
      let appId = unsplash._applicationId;
      HTTP.get(`search/photos/?page=1&per_page=${this.resultPerPage}&query=${this.defaultQuery}&client_id=${appId}`).then(response => {
        this.photos = response.data.results;
      })
      .catch(e => {
        this.errors.push(e)
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.search {
  min-height: 200px;
  background: #dde2e9;
  display: flex;
  justify-content: center;
  align-items: center;
  .search-field {
    padding: 30px 100px;
    margin: 0 auto;
    width: 100%;
    max-width: 992px;
    input {
      width: 100%;
    }
  }
}
.wrapper {
  margin: 0 auto;
  padding: 0 1.5em;
  max-width: 1200px;
  position: relative;
  top: -40px;
  .masonry {
    column-gap: 30px;
    column-fill: initial;
    .masonry-item {
      margin-bottom: 30px;
      display: inline-block;
      vertical-align: top;
      position: relative;
      cursor: pointer;
      &:after {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background: linear-gradient(180deg, transparent 45%, rgb(0, 0, 0) 100%);
        opacity: 1;
      }
      &:hover:after {
        background: linear-gradient(180deg, rgba(0,0,0, 0.5) 50%, rgb(0, 0, 0) 100%);
      }
      .photo-details {
        color: rgba(255,255,255,0.9);
        position: absolute;
        left: 0;
        right: 0;
        padding: 0 30px;
        bottom: 40px;
        z-index: 1;
        p, h3 {
          margin: 0;
        }
        h3 {
          margin: 5px 0;
        }
      }
      img {
        border-radius: 8px;
      }
    }
  }
}

// MEDIA QUERIES //
@media only screen and (max-width: 1023px) and (min-width: 768px){
  .masonry {
    column-count: 2;
  }
}
@media only screen and (min-width: 1024px){
  .masonry {
    column-count: 3;
  }
}
</style>
