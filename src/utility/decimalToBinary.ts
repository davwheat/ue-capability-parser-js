/**
 * @see https://stackoverflow.com/a/16155417
 */
export function decimalToBinary(dec: number): string {
  // >>> correctly handles negative numbers using two's complement
  return (dec >>> 0).toString(2);
}
