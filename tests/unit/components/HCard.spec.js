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

  const jcard = [
    ["n", {}, "text", ["Anderson", "Thomas"]],
    ["fn", {"pid": "1"}, "text", "Thomas Anderson"],
    ["tel", {"pid": "2", "type": "CELL"}, "phone-number", "+1 (555) 555-5555"],
    ["email", {"pid": "3", "type": "HOME"}, "text", "neo@example.com"]
  ]

  it('renders props when passed', () => {
    const value = vcard;
    const wrapper = shallowMount(HCard, {
      propsData: { value }
    })
    const properties = wrapper.findAll(Property)
    expect(properties.at(0).props().value).toEqual(jcard[0])
    expect(properties.at(1).props().value).toEqual(jcard[1])
    expect(properties.at(2).props().value).toEqual(jcard[2])
    expect(properties.at(3).props().value).toEqual(jcard[3])
  })
})
