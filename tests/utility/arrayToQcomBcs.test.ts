import { arrayToQcomBcs } from '../../src/utility';

it('converts bcs array to qcom bcs', () => {
  const result = arrayToQcomBcs([1, 3, 7, 8, 20, 28]);

  expect(result).toEqual('m269484426');
});

it('handles empty bcs array', () => {
  const result = arrayToQcomBcs([]);

  expect(result).toEqual('mAll');
});

it('handles length 1 bcs array', () => {
  const result = arrayToQcomBcs([1]);

  expect(result).toEqual('1');
});
