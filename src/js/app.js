import Vue from 'vue'

Vue.component('ExampleComponent', () => import('./Components/ExampleComponent.vue'))

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app'
  })
})
