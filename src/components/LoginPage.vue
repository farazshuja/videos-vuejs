<template>
    <div class="container">
        <form class="login" :class="{'has-error': !isFormValid}">
            <h2 class="logo"><i class="glyphicon glyphicon-film"></i> Crossover Video Portal</h2>
            <div class="form-group">                
                <input 
                    type="text" 
                    class="form-control" 
                    @keyup.enter="authenticateUser" 
                    @keypress="isFormValid = true" 
                    v-model="username" 
                    placeholder="User Id" />                
            </div>
            <div class="form-group">                
                <input 
                    type="password" 
                    class="form-control" 
                    @keyup.enter="authenticateUser" 
                     @keypress="isFormValid = true"
                    v-model="password" 
                    placeholder="Password" />
            </div>
            <transition name="fade">
                <label v-if="!isFormValid" class="error pull-left">{{error}}</label>
            </transition>            
            <button type="button" @click="authenticateUser" class="btn btn-default pull-right">Login</button>
            <div class="clearfix"></div>                    
        </form>
    </div> 

</template>

<script>
    import md5 from 'md5';    
    export default {
        data() {
            return {
                username: '',
                password: '',
                isFormValid: true,
                error: '*-Invalid User/Password'
            }
        },
        methods: {
            authenticateUser() {
                if(this.username === '' || this.password === '') {
                    //invalid form
                    this.isFormValid = false;
                }
                else {
                    this.$store.dispatch('reqInProgress', true);

                    //send auth req to server
                    this.$http.post('user/auth', {                        
                        username: this.username,
                        password: md5(this.password)
                    })
                    .then( res => res.json())
                    .then( data => {      
                        this.$store.dispatch('reqInProgress', false);                  
                        if(data.error) {
                            this.isFormValid = false;                            
                        }
                        else {  //redirect to home page
                            this.$store.dispatch('setUser', data);
                            
                            //also save it in cookie
                            this.$cookie.set('sessionId', data.sessionId);
                            this.$cookie.set('username', data.username);

                            //redirect to home page
                            this.$router.push('/home');
                        }                        
                    });
                }
            }
        }
    }
</script>

<style>
form.login {
    width: 400px;
    padding: 40px 20px;
    margin: 100px auto;   
    background: #4298b5; 
    border-radius: 5px;
}

h2.logo {
    color: #fff;
}
form.login h2.logo {
    margin: 0 0 20px 0;
    text-align: center;
}
@media (max-width: 430px) {
    form.login {
        width: 340px !important;
    }
}

</style>
