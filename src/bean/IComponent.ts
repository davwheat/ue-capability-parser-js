import { shallowEqualObjects } from 'shallow-equal';

export interface IComponent {
  compareTo(iComponent: IComponent): boolean;
  toStringExtended(): string;

  band: number;
  classDL: string;
  classUL: string;
  mimoDL: number;
  mimoUL: number;
  modDL: string | null;
  modUL: string | null;
}

export function defaultComponentComparer(this: IComponent, other: IComponent): boolean {
  const thisVals = {
    band: this.band,
    classDL: this.classDL,
    classUL: this.classUL,
    mimoDL: this.mimoDL,
    mimoUL: this.mimoUL,
    modDL: this.modDL,
    modUL: this.modUL,
  };

  const otherVals = {
    band: other.band,
    classDL: other.classDL,
    classUL: other.classUL,
    mimoDL: other.mimoDL,
    mimoUL: other.mimoUL,
    modDL: other.modDL,
    modUL: other.modUL,
  };

  return shallowEqualObjects(thisVals, otherVals);
}
