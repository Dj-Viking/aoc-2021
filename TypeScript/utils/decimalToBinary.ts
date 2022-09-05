//for debugging
export function decimalToBinary(x: number): string {
  let bin = 0;
  let strbin = "";
  let rem,
    i = 1;
  while (x != 0) {
    rem = x % 2;
    x = parseInt((x / 2).toString());
    bin = bin + rem * i;
    i = i * 10;
  }
  if (bin.toString().length < 7) {
    strbin = `0${bin}`;
  } else {
    strbin = bin.toString();
  }
  return strbin;
}
