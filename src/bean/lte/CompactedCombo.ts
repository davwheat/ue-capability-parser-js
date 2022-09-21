/**
 * Tuple<int, char>
 */
export type BandTuple = [number, string];

export class CompactedCombo {
  bands: BandTuple[];
  private _mimo: string[];
  private _upload: string[];

  private mimoSorted: boolean = false;
  private uploadSorted: boolean = false;

  constructor(bands: BandTuple[], mimo: string[] = [], upload: string[] = []) {
    this.bands = bands;
    this._mimo = mimo;
    this._upload = upload;
  }

  get mimo(): string[] {
    if (!this.mimoSorted) {
      this._mimo.sort((a, b) => b.localeCompare(a));
      this.mimoSorted = true;
    }
    return this._mimo;
  }

  get upload(): string[] {
    if (!this.uploadSorted) {
      this._upload.sort((a, b) => b.localeCompare(a));
      this.uploadSorted = true;
    }
    return this._upload;
  }

  toString(): string {
    const data = {
      dl: this.bandToString(),
      mimo: this.mimo,
      ul: this.upload,
    };

    return JSON.stringify(data);
  }

  bandToString(): string[] {
    return this.bands.map((band) => `${band[0]}${band[1]}`);
  }

  addMimo(mimo: string): void {
    if (!this._mimo.includes(mimo)) {
      this._mimo.push(mimo);
      this.mimoSorted = false;
    }
  }

  addUpload(upload: string): void {
    if (!this._upload.includes(upload)) {
      this._upload.push(upload);
      this.uploadSorted = false;
    }
  }
}
