import Vue from 'vue'
import VideoBox from '@/components/VideoBox'

// helper function that mounts and returns the rendered text
function getRenderedText (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData }).$mount()  
  return vm.$el.querySelector('h3').textContent;
}

describe('VideoBox', () => {
  it('renders correctly the video title', () => {
    expect(getRenderedText(VideoBox, {
      video: {
          _id: '123',
          name: 'Test Video',
          ratings: [1,2,3]          
      }
    })).to.equal('Test Video')
    
  });  
    
});
