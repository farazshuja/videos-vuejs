import Vue from 'vue'
import VideoPlayer from '@/components/VideoPlayer'

// helper function that mounts and returns the rendered text
function getRenderedText (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData }).$mount()  
  return vm.$el.querySelector('h3').textContent;
}

describe('VideoPlayer', () => {
  it('renders correctly the video title', () => {
    expect(getRenderedText(VideoPlayer, {
      video: {
          _id: '123',
          name: 'Test Video',
          ratings: [1,2,3],
          url: 'videos/google.mp4'         
      }
    })).to.equal('Test Video')
    
  });  
    
});
