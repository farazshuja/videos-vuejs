<template>
  <div id="app">    
    <router-view></router-view>

    <!-- Ajax indicator -->
    <div v-if="inProgress" class="loader">
        <div><img width="100%" src="./assets/img/loader.gif" alt="loading" /></div>
    </div>
  </div>
</template>

<script>

export default {    
  computed: {
    inProgress() {      
      return this.$store.getters.inProgress;
    }
  }
}
</script>

<style>
body {
    font-family: 'Oswald', sans-serif;
    background: #adc4cc;
}
.none {
    display: none !important;
}

label.error {
    color: #a90f0c;
    font-size: 12px;
}
.no-result {
    text-align: center;
    margin: 30px 0;
    color: #555;
    font-size: 24px;
}
.border-error {
    border-color: #a94442;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
}

/* Ajax Loader indicator */
.loader {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.20);
}
.loader div {
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -25px;
    margin-top: -25px;
}

/* CSS3 Animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

/* For showing the video player */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

/* For adding new videos on page */
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

</style>

