import { IComponent } from '../IComponent';

export class ComponentNr implements IComponent {
  band: number;
  classDL: string;
  classUL: string;
  mimoDL: number;
  mimoUL: number;
  modDL: string | null;
  modUL: string | null;

  maxBandwidth: number = 0;
  channelBW90mhz: boolean = false;
  scs: number = 0;
  bandwidthsDL: Record<number, number[]> | null = null;
  bandwidthsUL: Record<number, number[]> | null = null;
  maxUplinkDutyCycle: number = 100;
  powerClass: number = 3;
  rateMatchingLTEcrs: boolean = false;

  compareTo(comp: IComponent): boolean {
    throw new Error('Not implemented');
  }

  get isSUL(): boolean {
    return this.classUL === '0';
  }

  get isFR2(): boolean {
    return this.band > 256;
  }

  constructor(band: number) {
    this.band = band;

    this.classDL = 'A';
    this.classUL = '0';
    this.mimoDL = 0;
    this.mimoUL = 0;
    this.modDL = '256qam';
    this.modUL = '64qam';
  }

  toString(): string {
    // 'n7'
    let str = 'n' + this.band.toString();

    // 'n7A'
    if (this.classDL === '0') {
      str += '*';
    } else {
      str += this.classDL;

      // 'n7A4'
      if (this.mimoDL > 0) {
        str += this.mimoDL;
      }
    }

    // 'n7A4A'
    if (this.classUL === '0') {
      str += '*';
    } else {
      str += this.classUL;

      // 'n7A4A4'
      if (this.mimoUL > 0) {
        str += this.mimoUL;
      }
    }

    return str;
  }

  /**
   * Format:
   *
   * ```
   * 'n7A4^256qamA4^64qam'
   * ```
   */
  toStringExtended(): string {
    // 'n7'
    let str = 'n' + this.band.toString();

    // 'n7A'
    if (this.classDL === '0') {
      str += '*';
    } else {
      str += this.classDL;

      // 'n7A4'
      if (this.mimoDL > 0) {
        str += this.mimoDL;
      }

      // 'n7A4^1024qam'
      if (this.modDL != '256qam') {
        str += '^' + this.modDL;
      }
    }

    // 'n7A4A^1024qam'
    if (this.classUL === '0') {
      str += '*';
    } else {
      str += this.classUL;

      // 'n7A4^1024qamA4'
      if (this.mimoUL > 0) {
        str += this.mimoUL;
      }

      // 'n7A4A4^256qam'
      if (this.modUL != '64qam') {
        str += '^' + this.modUL;
      }
    }

    str += `^${this.maxBandwidth}-${this.scs}`;

    return str;
  }
}
