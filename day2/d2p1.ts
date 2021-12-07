/**
 * forward 5
   down 5
   forward 8
   up 3
   down 8
   forward 2
    Your horizontal position and depth both start at 0. The steps above would then modify them as follows:

    forward 5 adds 5 to your horizontal position, a total of 5.
    down 5 adds 5 to your depth, resulting in a value of 5.
    forward 8 adds 8 to your horizontal position, a total of 13.
    up 3 decreases your depth by 3, resulting in a value of 2.
    down 8 adds 8 to your depth, resulting in a value of 10.
    forward 2 adds 2 to your horizontal position, a total of 15.
    After following these instructions, you would have a horizontal position of 15 and a depth of 10. (Multiplying these together produces 150.)

    Calculate the horizontal position and depth you would have after following the planned course. What do you get if you multiply your final horizontal position by your final depth?
 */

import { getInput } from "../utils/getInput";

(async function(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      //keep in mind the solve script is running in the context of the dist directory

      const splitInput = getInput("../day2/input.txt");

      let hPos = 0;
      let vPos = 0;
      let word = "";
      let num = 0;

      for (let i = 0; i < splitInput.length; i++) {
        word = splitInput[i].split(" ")[0];
        num = Number(splitInput[i].split(" ")[1]);

        switch(true) {
          case /forward/g.test(word): {
            hPos += num;
          }
          break;
          case /up/g.test(word): {
            vPos -= num;
          }
          break;
          case /down/g.test(word): {
            vPos += num
          }
          break;
          default: break;
        }
      }
      console.log(hPos * vPos);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();