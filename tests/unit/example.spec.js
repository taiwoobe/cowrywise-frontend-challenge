import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Unit Testing a component', () => {
  const wrapper = mount(Home);
  // To access the actual Vue instance via `wrapper.vm`
  const vm = wrapper.vm;
  // it's also easy to check for the existence of elements
  it('check if page has a text field', () => {
    expect(wrapper.contains('input')).toBe(true);
  })
})
