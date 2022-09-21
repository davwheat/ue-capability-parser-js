import { CompactedCombo } from './lte/CompactedCombo';

export class CompactedCapabilities {
  flags: number;
  combos: null | CompactedCombo[];

  constructor(flags: number = 0, combos: null | CompactedCombo[] = null) {
    this.flags = flags;
    this.combos = combos;
  }

  toString(): string {
    return JSON.stringify({
      combos: this.combos,
      flags: this.flags,
    });
  }

  combosToString(): string {
    throw new Error('Not implemented');
  }
}
