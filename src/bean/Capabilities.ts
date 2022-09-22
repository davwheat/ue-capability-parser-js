import { ComboLte } from "./lte/ComboLte";
import { ComponentLte } from "./lte/ComponentLte";

type ConstructorParams =
  | {
      lteComboList: ComboLte[];
    }
  | {
      lteComboList: ComboLte[];
      flags: number;
    }
  | {
      lteComboList: ComboLte[];
      enDcComboList: ComboNr[];
      flags: number;
    }
  | {
      lteComboList: ComboLte[];
      enDcComboList: ComboNr[];
      saComboList: ComboNr[];
      nrNSAbands: ComponentNr[];
      nrSAbands: ComponentNr[];
      lteCategoryDl: number;
      lteCategoryUl: number;
    };

export class Capabilities {
  lteCombos: ComboLte[] | null = null;
  lteBands: ComponentLte[] | null = null;
  nrNSAbands: ComponentNr[] | null = null;
  nrSAbands: ComponentNr[] | null = null;

  lteCategoryDL: number | null = 0;
  lteCategoryUL: number | null = 0;

  private metadata: Record<string, unknown> = {};

  flags: number = 0;
  enDcCombos: ComboNr[] | null = null;
  nrCombos: ComboNr[] | null = null;

  /**
   * Capabilities constructor.
   *
   * All constructors from the Kotlin project have been merged into one. Please provide params as an object.
   */
  constructor(options: ConstructorParams) {
    this.lteCombos = options.lteComboList;

    if ('saComboList' in options) {
      this.enDcCombos = options.enDcComboList;
      this.nrCombos = options.saComboList;
      this.nrNSAbands = options.nrNSAbands;
      this.nrSAbands = options.nrSAbands;
      this.lteCategoryDL = options.lteCategoryDl;
      this.lteCategoryUL = options.lteCategoryUl;
    } else if ('enDcComboList' in options) {
      this.enDcCombos = options.enDcComboList;
      this.flags = options.flags;
    } else if ('flags' in options) {
      this.flags = options.flags;
    }
  }

  setMetadata(key: string, value: unknown): void {
    this.metadata[key] = value;
  }

  getMetadata(key: string): unknown {
    return this.metadata[key] ?? null;
  }
}
