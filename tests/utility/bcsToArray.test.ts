import { bcsToArray } from '../../src/utility';

it('converts invalid bcs to array', () => {
  expect(bcsToArray(0b0, false)).toEqual([0]);
  expect(bcsToArray(0b0, true)).toEqual([0]);
});

it('converts qualcomm bcs to array', () => {
  expect(bcsToArray(0b10000000100000000000110001010, true)).toEqual([1, 3, 7, 8, 20, 28]);
});

it('converts standard bcs to array', () => {
  expect(bcsToArray(0b110001010, true)).toEqual([1, 3, 7, 8]);
});
