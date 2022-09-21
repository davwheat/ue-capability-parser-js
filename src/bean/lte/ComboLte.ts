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
    this.masterComponents.join('-');
  }
}
