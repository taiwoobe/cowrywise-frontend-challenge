<template>
    <div>
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
                <div class="modal-body">
                    <img :src="singlePhoto.urls.full" class="img-responsive" :alt="singlePhoto.alt_description"/>
                </div>
                    <div class="modal-footer">
                        <h4>{{ singlePhoto.user.name }}</h4>
                        <p>{{ singlePhoto.user.location }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "photoModal",
  props: ["singlePhoto"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.fade {
    transition: opacity .5s ease-in-out;
}
.modal-content {
    background-color: transparent;
    border: none;
    .modal-header {
        border-bottom: none;
        .close {
            color: #fff;
            opacity: 0.8;
            outline: none;
        }
        &:focus{
            outline: none;
        }
    }
    .modal-body {
        background-color: #fff;
        border: none;
        padding: 0;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        overflow: hidden;
    }
    .modal-footer {
        background-color: #fff;
        border: none;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        color: rgba(65,81,109,1);
        display: block;
        padding: 25px;
        h4{
            margin: 5px 0;
        }
        p {
            margin: 0;
        }
    }
}
@media only screen and (min-width: 768px){
  .modal-content {
      .modal-header {
          .close {
            margin: 0;
            position: fixed;
            top: 10px;
            right: 30px;
        }
      }
  }
}
</style>