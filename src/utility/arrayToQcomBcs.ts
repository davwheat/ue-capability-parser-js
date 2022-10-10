export function arrayToQcomBcs(bcs: number[]): string {
  if (bcs.length === 0) return 'mAll';
  if (bcs.length === 1) return bcs[0].toString();

  let count = 0;
  bcs.forEach((val) => {
    count += 1 << val;
  });

  return `m${count}`;
}
