import { Capabilities } from '../bean/Capabilities';

export abstract class ImportCapabilities {
  get debug(): boolean {
    return false;
  }

  abstract parse(caBandCombosString: string): Capabilities;

  static lteDlCC = 6;
  static lteUlCC = 2;
  static nrDlCC = 9;
  static nrUlCC = 4;
}
