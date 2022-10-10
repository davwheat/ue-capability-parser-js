import { bcsToArray } from '../../utility';
import { ICombo } from '../ICombo';
import { IComponent } from '../IComponent';

export class ComboLte implements ICombo {
  masterComponents: IComponent[];
  /**
   * Always empty
   */
  secondaryComponents: IComponent[] = [];
  bcs!: number[];

  constructor(components: IComponent[]);
  constructor(components: IComponent[], bcs: number);

  constructor(components: IComponent[], bcs?: number) {
    this.masterComponents = components;

    this.setSingleBcs(bcs ?? -1);
  }

  setSingleBcs(bcs: number) {
    this.bcs = bcsToArray(bcs, false);
  }

  toString(): string {
    return this.masterComponents.join('-');
  }

  toCsv(separator: string, standalone: boolean): string {
    let val = this.toString() + separator;

    let strBw = '';
    let strMimo = '';
    let strUl = '';
    let strDLMod = '';
    let strULMod = '';

    this.masterComponents.forEach((component) => {
      val += component.band;

      strDLMod += component.modDL;

      if (component.mimoDL !== 0) {
        strMimo += component.mimoDL;
      }

      if (!['0', '\u0000'].includes(component.classDL)) {
        strBw += component.classDL;
      }

      if (!['0', '\u0000'].includes(component.classUL)) {
        strUl += component.classUL;
        strULMod += component.modUL;
      }

      strBw += separator;
      strMimo += separator;
      strUl += separator;
      strDLMod += separator;
      strULMod += separator;
    });

    // TODO

    // while (i < ImportCapabilities.lteDlCC) {
    //   str.append(separator);
    //   strMimo.append(separator);
    //   strBw.append(separator);
    //   strUl.append(separator);
    //   strDLmod.append(separator);
    //   strULmod.append(separator);
    //   i++;
    // }

    // val.append(strBw).append(strMimo).append(strUl).append(strDLmod).append(strULmod);

    // var strBcs: String;

    // if (bcs.isNotEmpty()) {
    //   strBcs = bcs.contentToString().substring(1);
    //   strBcs = strBcs.substring(0, strBcs.length - 1);
    // } else {
    //   strBcs = 'all';
    // }

    // val.append(strBcs);

    return val;
  }
}
