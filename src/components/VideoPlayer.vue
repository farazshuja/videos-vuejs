<template>
    <div v-if="hasVideo" class="jumbotron">
        <div class="row">
            <div class="col-md-8">
                <video controls :src="video.url"></video>
            </div>
            <div class="col-md-4">
                <h3>{{video.name}}</h3>
                <p>{{video.description}}</p>
                <rating-star :id="video._id" :ratings="video.ratings" :allow-rate="true"></rating-star>
            </div>
        </div>
    </div>    
</template>

<script>
    import RatingStar from './RatingStar.vue';

    export default {
        props: ['video'],
        computed: {
            hasVideo() {
                return this.video ? true : false;
            }
        },
        components: {
            ratingStar: RatingStar
        }
    }
</script>

<style>
    .jumbotron h3 {
        margin: 0 0 5px 0;
        color: #00c7a0 !important;
    }
    .jumbotron p {
        font-size: 16px;
        line-height: 16px;
        font-family: 'PT Sans', sans-serif;
    }
    .jumbotron .stars {
        padding: 0;
        cursor: pointer;
    }
</style>