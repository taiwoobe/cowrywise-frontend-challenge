<template>
  <div>
    <search-component v-model="searchQuery" :searchResult="loading" :searchMessage="fetchingSearchMessage"></search-component>
    <div class="wrapper"> 
      <div class="skeleton-holder" v-if="photos.length <= 0">
        <skeleton-component></skeleton-component>
      </div>
      <div class="masonry" v-else>
        <transition-group name="fade">
          <div class="masonry-item" v-for="photo in photos" :key="photo.id">
            <img :src="photo.urls.small" class="img-responsive" :title="`View Photo by ${photo.user.name}`" :alt="photo.alt_description" v-on:click="openSelectedPhoto(photo)" data-toggle="modal" data-target=".bd-example-modal-lg"/> 
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
  import skeletonComponent from '@/components/skeleton-component.vue'
  import debounce from '../util/debounce'

  export default {
  name: 'photoList',
  components: {searchComponent, photoModal, skeletonComponent},
  data() {
    return {
      photos: [],
      errors: [],
      defaultQuery: 'african',
      resultPerPage: 8,
      searchQuery: '',
      selectedPhoto: {},
      download_url: '',
      pageLoading: '',
      loading: true,
      fetchingSearchMessage: ''
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
      let query = this.searchQuery;
      if (query.length == '') {
        this.getPhotos();
      } else {
        this.fetchingSearchMessage = `Searching for ${query}`;
        HTTP.get(`search/photos/?page=1&per_page=${this.resultPerPage}&query=${query}&client_id=${appId}`).then(response => {
          this.loading = false;
          this.fetchingSearchMessage = `Search Results for "${query}"`;
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
    },
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
@import '../styles/styles.scss';

</style>
