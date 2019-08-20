import * as JCard from '@/lib/JCard.js';

describe('JCard', () => {
  describe('addPids', () => {
    it('adds PIDs to properties', () => {
      const props = [
        ['email', {}, 'text', 'name@example.com'],
        ['email', {}, 'text', 'work@example.com']
      ]

      const actual = JCard.addPids(props);

      expect(actual).toHaveProperty('0.1.pid', "1");
      expect(actual).toHaveProperty('1.1.pid', "2");
    });

    it('will not add an ID that already exists', () => {
      const props = [
        ['email', {pid: "1"}, 'text', 'work@example.com'],
        ['email', {pid: ["2", "3"]}, 'text', 'other@example.com'],
        ['email', {}, 'text', 'name@example.com']
      ]

      const actual = JCard.addPids(props);

      expect(actual).toHaveProperty('2.1.pid', "4");
    });

    [
      'anniversary',
      'bday',
      'clientpidmap',
      'gender',
      'kind',
      'n',
      'prodid',
      'rev',
      'uid',
      'version'
    ].forEach((name) => {
      it('will not add an ID to ' + name, () => {
        const props = [[name, {}, 'text', 'who knows?']]

        const actual = JCard.addPids(props);

        expect(actual).not.toHaveProperty('0.1.pid');
      });
    });
  });
});
