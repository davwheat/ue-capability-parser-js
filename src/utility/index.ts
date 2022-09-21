import { Capabilities } from '../bean/Capabilities';
import { CompactedCapabilities } from '../bean/CompactedCapabilities';
import { BandTuple, CompactedCombo } from '../bean/lte/CompactedCombo';

/**
 * @see https://stackoverflow.com/a/16155417
 */
function dec2bin(dec: number): string {
  // >>> correctly handles negative numbers using two's complement
  return (dec >>> 0).toString(2);
}

export function compact(list: Capabilities): CompactedCapabilities {
  const lteCombos = list.lteCombos;

  if (lteCombos === null) {
    return new CompactedCapabilities(list.flags, []);
  }

  const map = new Map<BandTuple[], CompactedCombo[]>();

  lteCombos.forEach((combo) => {
    const compactBands: BandTuple[] = [];
    const mimoConf = '';
    const uplinkConf = '';
    let keepMimo = false;
  });
}

export function bcsToArray(bcs: number, isQualcomm: boolean): number[] {
  if (bcs === -1) return [];
  if (bcs === 0) return [0];

  const bcsArray = [];

  let x = 0;
  let y = 0;

  if (isQualcomm) {
    while (bcs > 0) {
      if ((bcs & 1) == 1) {
        bcsArray[y] = x;
        y++;
      }

      bcs = bcs >> 1;
    }
  } else {
    const binary = dec2bin(bcs);

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
