<template>
    <div class="container">
        <app-nav></app-nav>
        <transition name="slide-fade">
            <video-player :video="currentVideo"></video-player>
        </transition>        
        <video-list></video-list>
    </div>
</template>

<script>
    import AppNav from './AppNav.vue';
    import VideoList from './VideoList.vue';
    import VideoPlayer from './VideoPlayer.vue';

    export default {
        components: {
            appNav: AppNav,
            videoList: VideoList,
            videoPlayer: VideoPlayer
        },
        computed: {
            currentVideo() {
                return this.$store.getters.currentVideo;
            }
        }     
    }
</script>