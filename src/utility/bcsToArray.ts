import { decimalToBinary } from './decimalToBinary';

export function bcsToArray(bcs: number, isQualcomm: boolean): number[] {
  if (bcs === -1) return [];
  if (bcs === 0) return [0];

  const bcsArray = [];

  let x = 0;
  let y = 0;

  if (isQualcomm) {
    while (bcs > 0) {
      if ((bcs & 1) === 1) {
        bcsArray[y] = x;
        y++;
      }

      bcs = bcs >> 1;
      x++;
    }
  } else {
    const binary = decimalToBinary(bcs);

    while (x < binary.length) {
      if (binary[x] == '1') {
        bcsArray[y] = x;
        y++;
      }

      x++;
    }
  }

  return bcsArray;
}
