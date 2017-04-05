<template>
    <div class="row">
        <transition-group name="list">
            <video-box v-for="video in videos" :video="video" key="video._id"></video-box>
        </transition-group>        
    </div>
</template>

<script>
    import VideoBox from './VideoBox.vue';
    import { eventBus } from '../main.js';

    export default {
        data() {
            return {
                skip: 1,
                limit: 14,
                videos: []
            }
        },
        components: {
            videoBox: VideoBox
        },
        methods: {
            loadVideos() {
                this.$store.dispatch('reqInProgress', true);
                this.$http.get('videos?sessionId=' + this.$store.getters.user.sessionId + '&skip=' + this.skip + '&limit=' + this.limit)
                    .then(res => res.json())
                    .then(res => {
                        //push new array using spread syntax
                        this.videos = [
                            ...this.videos,
                            ...res.data
                        ];
                        this.$store.dispatch('reqInProgress', false);
                    });
            },
            updateVideo(id, ratings) {
                debugger;
                const len = this.videos.length;
                for(let i=0;i<len;i++) {
                    let vid = this.videos[i];
                    if(vid._id == id) {
                        vid.ratings = ratings;
                        break;
                    }
                }
            }
        },
        created() {
            //load videos on first time load
            this.loadVideos();
            
            //hook lazy loading on scroll
            window.onscroll = (ev) => {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    // you're at the bottom of the page
                    this.skip = this.videos.length + 1;
                    this.loadVideos();
                }
            };              

            eventBus.$on('ratingChanged', (data) => {                
                this.updateVideo(data.videoId, data.ratings);
            });            
        }
    }
</script>