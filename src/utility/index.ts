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

/**
 * Compact. This works only for ordered ComboList!
 */
export function compact(list: Capabilities): CompactedCapabilities {
  const lteCombos = list.lteCombos;

  if (lteCombos === null) {
    return new CompactedCapabilities(list.flags, []);
  }

  /**
   * Key is BandTuple[], stringified
   */
  const map = new Map<string, CompactedCombo[]>();

  lteCombos.forEach((combo) => {
    const compactBands: BandTuple[] = [];
    let mimoConf = '';
    let uplinkConf = '';
    let keepMimo = false;

    combo.masterComponents.forEach((cc) => {
      const bandNum = cc.band;
      compactBands.push([bandNum, cc.classDL]);

      mimoConf += cc.mimoDL;
      uplinkConf += cc.classUL;

      if (!keepMimo && cc.mimoDL > 2) keepMimo = true;
    });

    const mimo = (() => {
      if ((list.flags !== 3 || mimoConf.includes('0')) && !keepMimo) return [];

      return mimoConf.split('');
    })();

    const compactCombo = new CompactedCombo(compactBands, mimo, uplinkConf.toString().split(''));

    const key = JSON.stringify(compactBands);

    // set array if not exists
    if (!map.has(key)) map.set(key, []);

    map.get(key)?.push(compactCombo);
  });

  // equivalent to kotlin's `flatMap`
  const flatenedMapVals = Array.from(map.values()).flat(1);

  const mimoMap = new Map<string | null, CompactedCombo>();

  flatenedMapVals.forEach((combo) => {
    const key = combo.mimo[0] ?? null;

    if (!mimoMap.has(key) || mimoMap.get(key) === null) {
      mimoMap.set(key, combo);
    } else {
      const existing = mimoMap.get(key)!;

      existing.addUpload(combo.upload[0]);
    }
  });

  const ulMap = new Map<string[], CompactedCombo>();

  Array.from(mimoMap.values()).forEach((combo) => {
    const key = combo.upload;

    const keyExists = ulMap.has(key);
    const oldVal = ulMap.get(key) ?? null;

    if (oldVal === null || !keyExists) {
      ulMap.set(key, combo);
    }

    if (oldVal !== null && combo.mimo.length !== 0) {
      oldVal.addMimo(combo.mimo[0]);
    }
  });

  const flatMap = Array.from(ulMap.values());

  function compareMimoUpload(s1: string[], s2: string[]) {
    let result = s1.length - s2.length;

    if (result === 0) {
      s1.some((v, i) => {
        result = v.localeCompare(s2[i]);

        if (result != 0) return true;

        return false;
      });
    }
  }
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
