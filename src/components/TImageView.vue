<template>

  <div>
    <div class="Timage-main">

      <img :src="curren_source.url" v-if="curren_source.type==='png'"/>

      <video :src="curren_source.url" v-if="curren_source.type==='mp4'" autoplay loop controls></video>

      <iframe width="100%" height="100%" :src="curren_source.url" v-if="curren_source.type==='txt'" frameborder="0">

      </iframe>

    </div>

    <div class="Timage-center">

      <div v-for="(source, index) in files()" :key="source.url" style="display: inline-block;position: relative;">
        <img class="thumbnail" v-if="source.type === 'png'"
             :src="source.url" @click="thumbnail_onclick(source)"/>

        <video class="thumbnail" v-if="source.type === 'mp4'" @click="thumbnail_onclick(source)"
               :src="source.url"></video>

        <img class="thumbnail" v-if="source.type === 'txt'"
             src="@/assets/img/log.png" @click="thumbnail_onclick(source)"/>

        <img src="https://coinfree.oss-cn-hangzhou.aliyuncs.com/%E5%88%A0%20%E9%99%A4.png" class="delete"
             @click="splice_files(index)"/>

      </div>

    </div>
    <div class="Timage-bottom"></div>

  </div>
</template>

<script>


  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'TImageView',

    data() {
      return {
        sources: [],
        curren_source: {},
      }
    },
    methods: {

      ...mapGetters(['products', 'projects', 'users', 'files']),
      ...mapMutations(['splice_files']),

      thumbnail_onclick(image) {
        this.curren_source = image
      },
    },
    watch: {
      '$store.state.tmt.files': function (nowVal, oldVal) {
        if (nowVal.length <= 0) {
          this.curren_source = {}
        } else {
          this.curren_source = nowVal[nowVal.length - 1]
        }
      }
    }
  }
</script>

<style>
  .Timage-main-image {
    height: 100%;
    width: 100%;
  }

  .gallery {
    height: 100%;
    width: 100%;
  }

  .wrapper {
    height: 100%;
    width: 100%;
  }

  .wrapper img {
    display: inline !important;
    width: auto !important;
    height: auto !important;
    max-width: 95% !important;;
    max-height: 95% !important;;
    box-shadow: darkgrey 10px 10px 30px 5px !important;;
  }

</style>


<style scoped>

  .Timage-main {
    width: 100%;
    height: calc(100% - 100px);
    text-align: center;
    /*border: 1px solid black;*/
    display: flex;
    justify-content: center;
    align-items: Center;
  }

  .Timage-main img {
    width: auto;
    height: auto;
    max-width: 95%;
    max-height: 95%;
    box-shadow: darkgrey 10px 10px 30px 5px;
  }

  .Timage-main video {
    width: auto;
    height: auto;
    max-width: 95%;
    max-height: 95%;
    box-shadow: darkgrey 10px 10px 30px 5px;
  }

  .Timage-center {
    width: 100%;
    height: 100px;
    text-align: center;
    /*为了效果明显，可以将如下边框打开，看一下效果*/
    /*border: 1px solid black;*/
    display: flex;
    justify-content: center;
    align-items: Center;
    position: relative;

  }

  .Timage-center .thumbnail {
    width: auto;
    height: 80px;
    max-width: 100%;
    max-height: 100%;
    border: 1px solid black;
    margin-left: 5px;
    margin-right: 5px;
    /*border-radius: 5px;*/
  }

  .delete {
    position: absolute;
    width: 15px;
    height: 15px;
    top: -5px;
    right: -4px;
  }

</style>
