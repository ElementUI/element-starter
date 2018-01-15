import Vue from 'vue'
import Header from '@/components/header.component'

describe('header.component.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Header)
    const vm = new Constructor().$mount()
    let innerHTML = vm.$el.innerHTML
    let content = vm.$el.querySelector('a:nth-of-type(2)').textContent
    console.log('content', content)
    expect(content).toEqual('Welcome to Your Vue.js App')
  })
})
