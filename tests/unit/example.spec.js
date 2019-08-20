import { shallowMount } from '@vue/test-utils'
import Property from '@/components/Property.vue'

describe('Property.vue', () => {
  it('renders props when passed', () => {
    const value = ['fn', {}, 'text', 'Thomas Anderson']
    const wrapper = shallowMount(Property, {
      propsData: { value }
    })
    expect(wrapper.text()).toMatch('name')
  })
})
