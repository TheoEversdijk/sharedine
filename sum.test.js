const sum = require('./sum');

test('one and two is three', () => {
    expect(sum(1, 2)).toBe(3);
});