import * as JCard from '@/lib/JCard.js';

describe('JCard', () => {
  describe('addPids', () => {
    it('adds PIDs to properties', () => {
      const props = [['email', {}, 'text', 'name@example.com']]

      const actual = JCard.addPids(props);

      expect(actual).toHaveProperty('0.1.pid');
    });
  });
});
