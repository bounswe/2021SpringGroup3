import {
  convertNumberFields,
  convertLocationFields,
} from '../src/screen/CommunitySearch';

test('Test Convert Number Fields', async () => {
  const fields = convertNumberFields({
    name: 'number',
    value: {
      start: '',
      end: 5,
    },
  });

  expect(fields).toStrictEqual({
    name: 'number',
    value: {
      start: Number.MIN_SAFE_INTEGER,
      end: 5,
    },
  });
});

test('Test Convert Location Fields', async () => {
  const fields = convertLocationFields({
    name: 'location',
    value: {
      geo: {
        latitude: 30,
        longitude: 40,
      },
      range: 0,
    },
  });

  expect(fields).toStrictEqual({
    name: 'location',
    value: {
      geo: {
        latitude: 30,
        longitude: 40,
        range: 100,
      },
    },
  });
});
