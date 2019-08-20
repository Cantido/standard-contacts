import { shallowMount } from '@vue/test-utils'
import HCard from '@/components/HCard.vue'
import Property from '@/components/Property.vue'

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
    const properties = wrapper.findAll(Property)
    expect(properties.at(0).props().value).toEqual(["n", {}, "text", ["Anderson", "Thomas"]])
    expect(properties.at(1).props().value).toEqual(["fn", {"pid": "1"}, "text", "Thomas Anderson"])
    expect(properties.at(2).props().value).toEqual(["tel", {"pid": "2", "type": "CELL"}, "phone-number", "+1 (555) 555-5555"])
    expect(properties.at(3).props().value).toEqual(["email", {"pid": "3", "type": "HOME"}, "text", "neo@example.com"])
  })
})
