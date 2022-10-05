import Vue from "vue"

import "./index.css"

import App from "./App.vue"

console.log(process.env)

new Vue({
    el: "#app",
    render: h => h(App)
})