<template>
    <div class="stars">
        <i v-for="(star, index) in stars" 
            class="glyphicon"
            @click="rateIt(index)"
            @mouseover="mouseover(index)"
            @mouseout="mouseout(index)"
            :class="starClass(index)"></i>
    </div>
</template>

<script>
    import { eventBus } from '../main.js';

    export default {
        data() {
            return {
                stars: [0,1,2,3,4],
                active: -1
            }
        },
        props: ['id', 'ratings', 'allow-rate'],
        computed: {
            average() {
                let sum = 0;
                const len = this.ratings.length;
                for(var i=0; i<len;i++) {
                    let rate = this.ratings[i];
                    sum += parseInt(rate, 10);
                }
                return Math.ceil(sum/len);
            }            
        },
        methods: {
            starClass(index) {
                var cName = 'glyphicon-star empty';
                if(index < this.average) {
                    cName = 'glyphicon-star';
                }
                //highlight star
                if(index <= this.active) {
                    cName += ' hover';
                }
                return cName;
            },
            rateIt(index) {
                this.$store.dispatch('reqInProgress', true);
                
                //send auth req to server
                this.$http.post('video/ratings?sessionId=' + this.$store.getters.user.sessionId, {
                    videoId: this.id,
                    rating: index+1
                })
                .then( res => res.json())
                .then( res => {      
                    this.$store.dispatch('reqInProgress', false);   
                    this.$store.dispatch('setCurrentVideoRating', res.data.ratings);

                    console.log(res.data.ratings);                    
                    //also update the rating in sibling component
                    eventBus.$emit('ratingChanged', {
                        videoId: res.data._id,
                        ratings: res.data.ratings
                    });             
                });
            },
            mouseover(i) {
                if(this.allowRate)
                    this.active = i;
                
            },
            mouseout() {
                if(this.allowRate)
                    this.active = -1;
            }
        }
    }
</script>

<style>
.stars {
    padding-top: 10px;
}
.stars i {
    font-size: 20px;
    color: #00a651;    
}
.stars i.empty {        
    color: #adc4cc;
}
.stars i.hover {
    color: #8dc63f;
}
</style>