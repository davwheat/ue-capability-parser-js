import { IComponent } from './IComponent';

export interface ICombo {
  masterComponents: IComponent[];
  secondaryComponents: IComponent[];

  toCsv(separator: string, standalone: boolean): string;
}
