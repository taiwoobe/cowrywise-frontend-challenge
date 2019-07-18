<template>
  <div>
    <search-component v-model="searchQuery"></search-component>
    <div class="wrapper"> 
      <div class="masonry" v-if="photos">
        <transition-group name="fade">
          <div class="masonry-item" v-for="photo in photos" :key="photo.id">
            <img :src="photo.urls.small" class="img-responsive" title="`View Photo by ${photo.user.name}`" :alt="photo.alt_description" v-on:click="openSelectedPhoto(photo)" data-toggle="modal" data-target=".bd-example-modal-lg"/>
              <a :href="download_url" download rel="nofollow" v-on:click="downloadPhoto(photo)">
                <font-awesome-icon icon="download" size="1x" class="download-img"/>
              </a>
            <div class="photo-details">
              <h4>{{ photo.user.name }}</h4>
              <p>{{ photo.user.location }}</p>
            </div>
          </div>
        </transition-group>
      </div>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors" :key="error.id">
          {{error.message}}
        </li>
      </ul>
    </div>
    <photoModal :singlePhoto="selectedPhoto"></photoModal>
  </div>
</template>

<script>
  import { HTTP, unsplash } from '../config/api'
  import searchComponent from '@/components/search.vue'
  import photoModal from '@/components/photo-modal.vue'
  import debounce from '../util/debounce'

  export default {
  name: 'photoList',
  components: {searchComponent, photoModal},
  data() {
    return {
      photos: [],
      errors: [],
      defaultQuery: 'african',
      resultPerPage: 8,
      searchQuery: '',
      selectedPhoto: {},
      download_url: ''
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
    },
    filteredPhotos() {
      let appId = unsplash._applicationId;
      let query = this.searchQuery.toLowerCase();
      if (query.length == '') {
        this.getPhotos();
      } else {
        HTTP.get(`search/photos/?page=1&per_page=${this.resultPerPage}&query=${query}&client_id=${appId}`).then(response => {
          this.photos = response.data.results
        })
        .catch(e => {
          console.log(e)
        })
      }
    },
    openSelectedPhoto(photo) {
      this.selectedPhoto = photo;
    },
    downloadPhoto(photo) {
      this.download_url = `${photo.links.download}?force=true`;
    }
  },
  watch: {
    searchQuery: debounce(function() {
      this.filteredPhotos();
    }, 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fade-enter-active {
  transition: opacity 0.5s ease-in-out;
  transition-delay: 0.1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.wrapper {
  margin: 0 auto;
  max-width: 992px;
  padding: 0 1.5em;
  position: relative;
  top: -50px;
  .masonry {
    column-fill: initial;
    column-gap: 25px;
    .masonry-item {
      border-radius: 8px;
      cursor: pointer;
      display: inline-block;
      margin-bottom: 30px;
      overflow: hidden;
      position: relative;
      vertical-align: top;
      width: 100%;
      &:after {
        border-radius: 8px;
        background: linear-gradient(180deg, transparent 45%, rgb(0, 0, 0) 100%);
        content: '';
        height: 100%;
        left: 0;
        opacity: 1;
        position: absolute;
        pointer-events: none;
        top: 0;
        width: 100%;
        z-index: 1;
      }
      img {
        z-index: 2;
      }
      &:hover {
        .download-img {
          color: #fff;
        }
      }
      &:hover:after {
        background: linear-gradient(180deg, rgba(0,0,0, 0.5) 50%, rgb(0, 0, 0) 100%);
        z-index: 1;
      }
      .download-img {
        color: #000;
        cursor: pointer;
        position: absolute;
        right: 25px;
        top: 25px;
        z-index: 2;
      }
      .photo-details {
        bottom: 40px;
        color: rgba(255,255,255,0.9);
        left: 0;
        padding: 0 25px;
        position: absolute;
        right: 0;
        z-index: 3;
        p, h4 {
          margin: 0;
        }
        h4 {
          margin: 5px 0;
        }
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
