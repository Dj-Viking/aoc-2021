export function getPermutations(segs: string): string | Array<string> {
  let string = segs;
  if (!string || typeof string !== "string") {
    throw new Error("Please enter a string");
  }

  if (!!string.length && string.length < 2) {
    return string;
  }

  let permutationsArray = [];

  for (let i = 0; i < string.length; i++) {
    let char = string[i];

    if (string.indexOf(char) != i) continue;

    let remainder = string.slice(0, i) + string.slice(i + 1, string.length);

    for (const permutation of getPermutations(remainder)) {
      permutationsArray.push(char + permutation);
    }
  }
  return permutationsArray;
}
