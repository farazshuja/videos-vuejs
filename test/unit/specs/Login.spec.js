import Vue from 'vue'
import LoginPage from '@/components/LoginPage'

describe('LoginPage', () => {
  it('should render correct content', () => {
    const Constructor = Vue.extend(LoginPage)
    const vm = new Constructor().$mount()

    //Test Logo
    expect(vm.$el.querySelector('h2.logo').textContent)
      .to.equal(' Crossover Video Portal');

    //must have login button
    expect(vm.$el.querySelector('button.btn').textContent)
      .to.equal('Login');      
	  	
  });

  it('should have valid inital state of data', () => { 
    const Constructor = Vue.extend(LoginPage)
    const vm = new Constructor().$mount()

    expect(vm.$data.error).to.equal('*-Invalid User/Password');
    expect(vm.$data.isFormValid).to.equal(true);
    expect(vm.$data.username).to.equal('');
    expect(vm.$data.password).to.equal('');

  });  

  it('should show errors on click of Login button of empty form', (done) => { 
    const Constructor = Vue.extend(LoginPage)
    const vm = new Constructor().$mount()

    vm.authenticateUser();

    Vue.nextTick(() => {
      expect(vm.$data.isFormValid).to.equal(false);
      done();
    });

  });  
    
});
