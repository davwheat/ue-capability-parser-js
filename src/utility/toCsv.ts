import { Capabilities } from '../bean/Capabilities';
import { ICombo } from '../bean/ICombo';
import { getLteCsvHeader } from './getLteCsvHeader';
import { getNrCsvHeader } from './getNrCsvHeader';

export function toCsv(listOrLists: Capabilities | ICombo[]): string {
  if (!Array.isArray(listOrLists)) {
    const { lteCombos, enDcCombos, nrCombos } = listOrLists;

    if (lteCombos?.length) {
      return toCsv(lteCombos);
    }

    if (enDcCombos?.length) {
      return toCsv(enDcCombos);
    }

    if (nrCombos?.length) {
      return toCsv(nrCombos);
    }

    return '';
  }

  if (!listOrLists.length) {
    return '';
  }

  const standalone = !listOrLists.some((c) => c.secondaryComponents.length === 0);

  let content = '';

  if (listOrLists[0] instanceof ComboNr) {
    content += getNrCsvHeader(standalone);
  } else {
    content += getLteCsvHeader();
  }

  listOrLists.forEach((x) => {
    content += x.toCsv(';', standalone);
    content += '\n';
  });

  return content;
}
