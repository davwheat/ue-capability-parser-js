import { defaultComponentComparer, IComponent } from '../IComponent';

export class ComponentLte implements IComponent {
  band: number;
  classDL: string;
  classUL: string;
  mimoDL: number;
  readonly mimoUL: number = 1;
  modDL: string | null;
  modUL: string | null;

  compareTo = defaultComponentComparer;

  constructor(band: number, classDL: string, classUL: string, mimoDL: number);
  constructor(band: number, classDL: string, mimoDL: number);
  constructor(band: number, classDL: string, classUL: number);
  constructor(band: number);
  constructor();

  constructor(band?: number, classDL?: string, _classUL_or_mimoDL?: string | number, _mimoDL?: number) {
    this.band = 0;
    this.classDL = 'A';
    this.classUL = '0';
    this.mimoDL = 0;
    this.modDL = null;
    this.modUL = null;

    if (band === undefined) {
      return;
    }

    this.band = band;

    if (classDL !== undefined && _classUL_or_mimoDL !== undefined) {
      this.classDL = classDL;

      const classUL = typeof _classUL_or_mimoDL === 'string' ? this.classUL : '0';
      const mimoDL = typeof _classUL_or_mimoDL === 'number' ? _classUL_or_mimoDL : _mimoDL ?? 0;

      this.classUL = classUL;
      this.mimoDL = mimoDL;

      if (_mimoDL !== undefined) {
        this.modDL = '64qam';
        this.modUL = '16qam';
      }

      return;
    }
  }

  toString(): string {
    // '7'
    let str = this.band.toString();

    // '7A
    str += this.classDL;

    // '7A4'
    if (this.mimoDL > 0) {
      str += this.mimoDL;
    }

    // '7A4A'
    if (this.classUL !== '0') {
      str += this.classUL;
    }

    return str;
  }

  /**
   * Format:
   *
   * ```
   * '7A^256qam4A^64qam'
   * ```
   *
   * Band, DL class, DL modulation, DL MIMO, UL class, UL modulation
   */
  toStringExtended(): string {
    // '7'
    let str = this.band.toString();

    // '7A'
    str += this.classDL;

    // '7A^256qam
    if (this.modDL !== '64qam') {
      str += `^${this.modDL}`;
    }

    // '7A^256qam4'
    if (this.mimoDL > 0) {
      str += this.mimoDL;
    }

    // '7A^256qam4A'
    if (this.classUL !== '0') {
      str += this.classUL;

      // '7A^256qam4A^64qam'
      if (this.modUL !== '16qam') {
        str += `^${this.modUL}`;
      }
    }

    return str;
  }

  static lteComponentsToArrays(inputArray: IComponent[]): {
    band: number[];
    bandwidth: string[];
    mimo: number[];
    upload: string[];
    modUL: (string | null)[];
  } {
    const band: number[] = [];
    const bandwidth: string[] = [];
    const mimo: number[] = [];
    const upload: string[] = [];
    const modUL: (string | null)[] = [];

    inputArray.forEach((component) => {
      band.push(component.band);
      bandwidth.push(component.classDL);
      mimo.push(component.mimoDL);
      upload.push(component.classUL);
      modUL.push(component.modUL);
    });

    return {
      band,
      bandwidth,
      mimo,
      upload,
      modUL,
    };
  }
}
