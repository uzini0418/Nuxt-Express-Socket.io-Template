import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2db4bdf3 = () => interopDefault(import('..\\pages\\chat\\index.vue' /* webpackChunkName: "pages_chat_index" */))
const _14027855 = () => interopDefault(import('..\\pages\\chat\\list\\index.vue' /* webpackChunkName: "pages_chat_list_index" */))
const _0b2fa11b = () => interopDefault(import('..\\pages\\chat\\_id.vue' /* webpackChunkName: "pages_chat__id" */))
const _dfefcbf0 = () => interopDefault(import('..\\pages\\user\\_id.vue' /* webpackChunkName: "pages_user__id" */))
const _4bf4508b = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/chat",
      component: _2db4bdf3,
      name: "chat"
    }, {
      path: "/chat/list",
      component: _14027855,
      name: "chat-list"
    }, {
      path: "/chat/:id",
      component: _0b2fa11b,
      name: "chat-id"
    }, {
      path: "/user/:id?",
      component: _dfefcbf0,
      name: "user-id"
    }, {
      path: "/",
      component: _4bf4508b,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
