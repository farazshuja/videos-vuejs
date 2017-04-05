import Vue from 'vue'
import RatingStar from '@/components/RatingStar'

// helper function that mounts and returns the rendered text
function getRenderedText (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData }).$mount()  
  return vm.starClass(4);
}

describe('RatingStar', () => {
  it('renders correctly the 5th star as highlighted', () => {
    expect(getRenderedText(RatingStar, {
      id: '123',
      ratings: [5,5,5],
      allowRate: false
    })).to.equal('glyphicon-star')
    
  });

  it('renders correctly the 5th star as un-highlighted', () => {
    expect(getRenderedText(RatingStar, {
      id: '123',
      ratings: [1,1,1],
      allowRate: false
    })).to.equal('glyphicon-star empty')
    
  })  
    
});
