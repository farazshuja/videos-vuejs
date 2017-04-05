<template>
    <div class="col-sm-3">
        <div class="thumbnail">
            <div class="tb">
            <div class="video">
                <video :src="video.url">
                    Sorry, your browser doesn't support embedded videos, 
                    but don't worry, you can <a :href="video.url">download it</a>
                    and watch it with your favorite video player!
                </video>
            </div> 
            </div>              
            <div class="caption">
                <h3><a href="#" @click.prevent="loadVideo">{{video.name}}</a></h3> 
                <rating-star :id="video._id" :ratings="video.ratings" :allow-rate="false"></rating-star>                                
            </div>
        </div>
    </div>
</template>

<script>
    import RatingStar from './RatingStar.vue';

    export default {
        props: ['video'],
        components: {
            ratingStar: RatingStar
        },
        methods: {
            loadVideo() {
                this.$store.dispatch('reqInProgress', true);
                window.scrollTo(0,0);
                this.$http.get('video?sessionId=' + this.$store.getters.user.sessionId + '&videoId=' + this.video._id)
                    .then(res => res.json())
                    .then(res => {
                        //push new array using spread syntax                        
                        this.$store.dispatch('setVideo', res.data)
                        this.$store.dispatch('reqInProgress', false);                        
                    });
            }
        }
    }
</script>

<style>    
    .tb {display: table; width: 100%;}
    div.video {
        display: table-cell;        
        vertical-align: middle;
        height: 170px;
        background: #eaeaea;
    }
    video {
        width: 100%;        
    }

    div.caption {
        height: 100px;
    }
    div.caption h3 {
        margin: 0;
        font-size: 18px;
    }    
    @media (max-width: 1000px) {        
        div.caption h3 {
            font-size: 14px !important;
        }
    }
    @media (max-width: 767px) {        
        div.caption h3 {
            font-size: 18px !important;
        }
    }
</style>