//State Management of the application
import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'

Vue.use(Vuex);
Vue.use(VueCookie);

//get the user from cookies if its there
let user = null;
const sessionId = VueCookie.get('sessionId');
if(sessionId) {
    user = {
        sessionId: sessionId,
        username: VueCookie.get('username')
    }
}

export default new Vuex.Store({
    state: {
        inProgress: false,    //to track whether some ajax req is in progress
        user,
        currentVideo: null
    },
    getters: {
        inProgress: state => {
            return state.inProgress;
        },
        user: state => {
            return state.user;
        },
        currentVideo: state => {
            return state.currentVideo;
        }
    },
    mutations: {        
        'Req_In_Progress'(state, inProgress) {
            state.inProgress = inProgress;
        },
        'SET_USER'(state, user) {
            state.user = user;
        },
        'SET_VIDEO'(state, video) {
            state.currentVideo = video;
        },
        'SET_CURRENT_VIDEO_RATING'(state, ratings) {
            state.currentVideo.ratings = ratings;
        }
    },
    actions: {
        reqInProgress(context, inProgress) {
            context.commit('Req_In_Progress', inProgress)
        },
        setUser(context, user) {
            context.commit('SET_USER', user);
        },
        setVideo(context, video) {
            context.commit('SET_VIDEO', video);
        },
        setCurrentVideoRating(context, ratings) {
            context.commit('SET_CURRENT_VIDEO_RATING', ratings);
        }
    }
})