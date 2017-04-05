import LoginPage from './components/LoginPage.vue'
import HomePage from './components/HomePage.vue'

export const routes = [
    { path: '', component: LoginPage },
    { path: '/home', component: HomePage }    
]