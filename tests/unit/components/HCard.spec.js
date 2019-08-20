import { shallowMount } from '@vue/test-utils'
import HCard from '@/components/HCard.vue'

describe('HCard.vue', () => {
  const vcard = `BEGIN:VCARD
VERSION:3.0
PRODID;VALUE=TEXT:ez-vcard 0.10.4
N:Anderson;Thomas
FN:Thomas Anderson
TEL;TYPE=CELL;VALUE=PHONE-NUMBER:+1 (555) 555-5555
EMAIL;TYPE=HOME:neo@example.com
END:VCARD`;

  it('renders props when passed', () => {
    const value = vcard;
    const wrapper = shallowMount(HCard, {
      propsData: { value }
    })
    expect(wrapper.html()).toContain('<property-stub')
  })
})
