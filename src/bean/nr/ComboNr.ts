import { ImportCapabilities } from '../../importer/ImportCapabilities';
import { ICombo } from '../ICombo';
import { IComponent } from '../IComponent';
import { ComponentLte } from '../lte/ComponentLte';
import { ComponentNr } from './ComponentNr';

export class ComboNr implements ICombo {
  masterComponents: IComponent[];
  secondaryComponents: IComponent[];
  featureSet: number;

  get isEnDc(): boolean {
    return this.masterComponents.length > 0 && this.masterComponents[0] instanceof ComponentLte;
  }

  get componentsNr(): IComponent[] {
    return this.isEnDc ? this.secondaryComponents : this.masterComponents;
  }

  get componentsLte(): IComponent[] {
    return this.isEnDc ? this.masterComponents : this.secondaryComponents;
  }

  constructor(master: IComponent[], secondary: IComponent[]);
  constructor(master: IComponent[], featureSet: number);
  constructor(master: IComponent[]);

  constructor(master: IComponent[], secondaryOrFS?: IComponent[] | number) {
    this.masterComponents = master;

    if (typeof secondaryOrFS === 'number') {
      this.featureSet = secondaryOrFS;
      this.secondaryComponents = [];
    } else {
      this.secondaryComponents = secondaryOrFS ?? [];
      this.featureSet = 0;
    }
  }

  toString(): string {
    let str = '';

    this.componentsLte.forEach((x) => {
      str += x;
      str += '-';
    });

    if (str.length > 1) {
      str = str.substring(0, str.length - 1);
      str += '_';
    }

    this.componentsNr.forEach((x) => {
      str += x;
      str += '-';
    });

    str += this.featureSet;

    return str;
  }

  toCsv(separator: string, standalone: boolean): string {
    const lteDlCC = standalone ? 0 : ImportCapabilities.lteDlCC;
    const lteUlCC = standalone ? 0 : ImportCapabilities.lteUlCC;
    const nrDlCC = ImportCapabilities.nrDlCC;
    const nrUlCC = ImportCapabilities.nrUlCC;

    const nrband: number[] = [];
    const nrbandwidth: string[] = [];
    const nrmimo: number[] = [];
    const nrupload: string[] = [];
    const nrmimoUL: number[] = [];
    const nrmaxbandwidth: number[] = [];
    const nrscs: number[] = [];

    const lteModUL: (string | null)[] = [];
    const nrModUL: (string | null)[] = [];

    let lteUL = '';
    let nrUL = '';
    let nrmimoULstring = '';

    const bands = this.componentsLte;
    const nrbands = this.componentsNr;

    const { band, bandwidth, mimo, upload, modUL } =
      lteDlCC > 0
        ? ComponentLte.lteComponentsToArrays(bands)
        : {
            band: [],
            bandwidth: [],
            mimo: [],
            upload: [],
            modUL: [],
          };

    nrbands.forEach((_nr: IComponent, i) => {
      const nr = _nr as ComponentNr;

      nrband[i] = nr.band;
      nrmimo[i] = nr.mimoDL;
      nrbandwidth[i] = nr.classDL;
      nrmaxbandwidth[i] = nr.maxBandwidth;
      nrupload[i] = nr.classUL;
      nrmimoUL[i] = nr.mimoUL;
      nrscs[i] = nr.scs;
      nrModUL[i] = nr.modUL;
    });

    let str = this.toString() + separator;

    for (let i = 0; i < lteDlCC; i++) {
      const b = band[i];
      if (b !== 0) {
        str += b;
      }

      const bw = bandwidth[i];
      if (bw !== '0' && bw !== '\u0000') {
        str += bw;
      }

      str += separator;

      const ul = upload[i];
      if (ul !== '0' && ul !== '\u0000') {
        if ((lteUL.split(separator).length - 1) / 2 < lteUlCC) {
          lteUL += b + ul + separator + lteModUL[i] + separator;
        }
      }
    }

    while ((lteUL.split(';').length - 1) / 2 < lteUlCC) {
      lteUL += separator + separator;
    }

    if (lteUlCC > 0) {
      str += lteUL;
    }

    for (let i = 0; i < nrDlCC; i++) {
      const b = nrband[i];
      if (b !== 0) {
        str += b;
      }

      const bw = nrbandwidth[i];
      if (bw !== '0' && bw !== '\u0000') {
        str += bw;
      }

      str += separator;

      const maxbw = nrmaxbandwidth[i];
      if (maxbw !== 0) {
        str += maxbw;
      }

      str += separator;

      const scs = nrscs[i];
      if (scs !== 0) {
        str += scs;
      }

      str += separator;

      const ul = nrupload[i];
      if (ul !== '0' && ul !== '\u0000') {
        if ((nrUL.split(separator).length - 1) / 2 < nrUlCC) {
          nrUL += b + ul + separator + nrModUL[i] + separator;
          nrmimoULstring += nrmimoUL[i] + separator;
        }
      }
    }

    while ((nrUL.split(separator).length - 1) / 2 < nrUlCC) {
      nrUL += separator + separator;
    }

    str += nrUL;

    mimo.forEach((v) => {
      if (v !== 0) {
        str += v;
      }

      str += separator;
    });

    nrmimo.forEach((v) => {
      if (v !== 0) {
        str += v;
      }

      str += separator;
    });

    while (nrmimoULstring.split(separator).length - 1 < nrUlCC) {
      nrmimoULstring += separator;
    }

    str += nrmimoULstring;
    return str;
  }
}
