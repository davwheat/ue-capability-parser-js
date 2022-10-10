import { ImportCapabilities } from '../importer/ImportCapabilities';

export function getNrCsvHeader(standalone: boolean): string {
  const separator = ';';

  let header = `combo${separator}`;

  const lteDlCC = standalone ? 0 : ImportCapabilities.lteDlCC;
  const lteUlCC = standalone ? 0 : ImportCapabilities.lteUlCC;
  const nrDlCC = ImportCapabilities.nrDlCC;
  const nrUlCC = ImportCapabilities.nrUlCC;

  for (let i = 1; i <= lteDlCC; i++) {
    header += 'DL' + i + separator;
  }

  for (let i = 1; i <= lteUlCC; i++) {
    header += 'UL' + i + separator;
    header += 'MOD UL' + i + separator;
  }

  for (let i = 1; i <= nrDlCC; i++) {
    header += 'NR DL' + i + separator;
    header += 'NR BW' + i + separator;
    header += 'NR SCS' + i + separator;
  }

  for (let i = 1; i <= nrUlCC; i++) {
    header += 'NR UL' + i + separator;
    header += 'NR UL MOD' + i + separator;
  }

  for (let i = 1; i <= lteDlCC; i++) {
    header += 'mimo DL' + i + separator;
  }

  for (let i = 1; i <= nrDlCC; i++) {
    header += 'mimo NR DL' + i + separator;
  }

  for (let i = 1; i <= nrUlCC; i++) {
    header += 'mimo NR UL' + i + separator;
  }

  header += '\n';

  return header;
}
