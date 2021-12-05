import { applyODataParams } from './apply-odata-params';

const testData = [
  { user: 'fabio', details: { city: 'Milan', age: 34 } },
  { user: 'max', details: { city: 'Munich', age: 29 } },
  { user: 'zacarias', details: { city: 'Sao Paulo', age: 44 } },
  { user: 'robert', details: { city: 'Manchester', age: 28 } },
  { user: 'klaus', details: { city: 'Zurich', age: 38 } },
];

describe('applyODataParams', function () {
  it('no query string returns the test data as-is', async function () {
    const data = applyODataParams(testData, '');
    expect(data).toStrictEqual(testData);
  });
});
