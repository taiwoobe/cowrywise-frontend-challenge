<template>
    <div class="wrapper"> 
        <div class="no-result" v-if="NO_RESULT">
            <img src="../assets/no_result.gif" alt="No Result Found">
        </div>
      <div class="skeleton-holder" v-else-if="photos.length <= 0 && LOADING_STATUS">
        <skeleton-component></skeleton-component>
      </div>
      <h4 v-else-if="ERRORS && ERRORS.length !== ''" class="text-center">
          {{ ERRORS }}
      </h4>
      <div class="masonry">
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
      <photoModal :singlePhoto="selectedPhoto"></photoModal>
    </div>
</template>

<script>
import skeletonComponent from '@/components/skeleton-component.vue'
import photoModal from '@/components/photo-modal.vue'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    name: 'photoComponent',
    components: {skeletonComponent, photoModal},
    data() {
        return {
            selectedPhoto: {},
            download_url: '',
        }
    },
    mounted() {
        this.$store.dispatch('getPhotos');
    },
    computed: {
        ...mapState(['photos']),
        ...mapGetters(['LOADING_STATUS', 'NO_RESULT', 'ERRORS'])
    },
    methods: {
        openSelectedPhoto(photo) {
            this.selectedPhoto = photo;
        },
        downloadPhoto(photo) {
            this.download_url = `${photo.links.download}?force=true`;
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../styles/styles.scss';

</style>