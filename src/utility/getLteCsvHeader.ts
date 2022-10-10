import { ImportCapabilities } from '../importer/ImportCapabilities';

export function getLteCsvHeader(): string {
  const separator = ';';

  let header = `combo${separator}`;

  const lteDlCC = ImportCapabilities.lteDlCC;
  const lteUlCC = ImportCapabilities.lteUlCC;

  for (let i = 1; i <= lteDlCC; i++) {
    header += 'band' + i + separator;
  }

  for (let i = 1; i <= lteDlCC; i++) {
    header += 'class' + i + separator;
  }

  for (let i = 1; i <= lteDlCC; i++) {
    header += 'mimo' + i + separator;
  }

  for (let i = 1; i <= lteDlCC; i++) {
    header += 'ul' + i + separator;
  }

  for (let i = 1; i <= lteDlCC; i++) {
    header += 'DLmod' + i + separator;
  }

  for (let i = 1; i <= lteDlCC; i++) {
    header += 'ULmod' + i + separator;
  }

  header += 'bsc';

  header += '\n';

  return header;
}
