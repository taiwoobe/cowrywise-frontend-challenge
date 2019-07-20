<template>
    <div class="masonry">
        <transition-group name="fade">
          <div class="masonry-item" v-for="n in 8" :key="n">
            <img class="img-responsive skeletonBox" :style="imgStylesObject"/> 
            <div class="photo-details">
              <h4 class="skeletonBox" :style="{height, width, backgroundColor}"></h4>
              <p class="skeletonBox" :style="{height, width: paragraphWidth, backgroundColor}"></p>
            </div>
          </div>
        </transition-group>
    </div>
</template>

<script>
    export default {
        name: "skeletonComponent",
        data() {
            return {
                height: '10px',
                width: '65%',
                paragraphWidth: '40%',
                backgroundColor: '#e6e6e6',
                imgStylesObject: {
                   minHeight: '400px',
                },                
            }
        }
    }
</script>


<style lang="scss" scoped>
@import '../styles/styles.scss';
.skeletonBox {
    display: inline-block;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    background-color: whitesmoke;
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(90deg, rgba(rgb(184, 184, 184), 0) 0, rgba(whitesmoke, 0.2) 20%, rgba(whitesmoke, 0.5) 60%, rgba(rgb(184, 184, 184),  0));
      animation: shimmer 5s infinite;
      content: '';
    }
    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }
 }
</style>