<template>
    <nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#/home"><i class="glyphicon glyphicon-film"></i> XO Video</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">      
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#/home"><strong>Welcome {{user.username}}!</strong></a></li>
        <li><a href="javascript:void(0)" @click.prevent="logout">Logout</a></li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
</template>

<script>
    export default {
        computed: {
            user() {
                return this.$store.getters.user;
            }            
        },
        methods: {
            logout() {    
                this.$store.dispatch('reqInProgress', true);            
                this.$http.get('user/logout?sessionId=' + this.user.sessionId)
                    .then(res => res.json())
                    .then(data => {
                        this.$store.dispatch('reqInProgress', false);
                        if(data.status === 'success') {
                            this.$store.dispatch('setUser', null);
                            this.$store.dispatch('setVideo', null);
                            
                            //also save it in cookie
                            this.$cookie.delete('sessionId');
                            this.$cookie.delete('username');

                            //redirect to Login page
                            this.$router.push('/');
                        }
                    })
            }
        }
    }
</script>

<style>
    .navbar {
        margin: 10px 0;
    }
    .navbar-brand {
        color: #00c7a0 !important;
    }
</style>