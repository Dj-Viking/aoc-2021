export function recurseCo2(list: Array<string>, step = 0): string {
  let count = 0;
  for (let i = 0; i < list.length; i++) {
    if (parseInt(list[i][step]) === 1) count++;
  }

  let k = 0;
  if (count < list.length / 2) k = 1;

  let temp = [] as Array<string>;
  for (let j = 0; j < list.length; j++) {
    if (parseInt(list[j][step]) === k) temp.push(list[j]);
  }

  if (temp.length > 1 && step < temp[0].length) return recurseCo2(temp, step + 1);
  else return temp[0];
}
