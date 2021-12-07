/**
   * In addition to horizontal position and depth, you'll also need to track a third value, aim, which also starts at 0. The commands also mean something entirely different than you first thought:

  down X increases your aim by X units.
  up X decreases your aim by X units.
  forward X does two things:
  It increases your horizontal position by X units.
  It increases your depth by your aim multiplied by X.

  forward 5 adds 5 to your horizontal position, a total of 5. Because your aim is 0, your depth does not change.
  down 5 adds 5 to your aim, resulting in a value of 5.
  forward 8 adds 8 to your horizontal position, a total of 13. Because your aim is 5, your depth increases by 8*5=40.
  up 3 decreases your aim by 3, resulting in a value of 2.
  down 8 adds 8 to your aim, resulting in a value of 10.
  forward 2 adds 2 to your horizontal position, a total of 15. 
  
  Because your aim is 10, your depth increases by 2*10=20 to a total of 60.
  After following these new instructions, you would have a horizontal position of 15 and a depth of 60. (Multiplying these produces 900.)
 */

import fs from "fs";
(async function(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      //keep in mind the solve script is running in the context of the dist directory
      const inputVal = fs.readFileSync(`../day2/input.txt`, { encoding: "utf-8" });
      const splitInput = inputVal.split("\n");

      let aim = 0;
      let hPos = 0;
      let forward = 0;
      let vPos = 0;
      let word = "";
      let num = 0;

      for (let i = 0; i < splitInput.length; i++) {
        word = splitInput[i].split(" ")[0];
        num = Number(splitInput[i].split(" ")[1]);
        forward = 0;
        switch (true) {
          case /forward/g.test(word): {
            forward = num;
            hPos += num;
            if (aim === 0) continue;
            if (aim > 0) {
              vPos += (forward * aim);
            }
          }
            break;
          case /up/g.test(word): aim -= num;
            break;
          case /down/g.test(word): aim += num;
            break;
          default:
            break;
        }
      }
      console.log(hPos * vPos);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
})();