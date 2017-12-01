import Vue from 'vue'
import Header from '@/components/header.component'

describe('header.component.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Header)
    const vm = new Constructor().$mount()
    let innerHTML = vm.$el.innerHTML
    expect(innerHTML).toEqual('a')
    console.log('vm', innerHTML)
    expect(vm.$el.querySelector('.dashboard-root a .nav__link').textContent)
    .toEqual('Welcome to Your Vue.js App')
  })
})
