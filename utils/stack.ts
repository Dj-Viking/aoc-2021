interface IStack<T> {
  push(item: T): void;
  pop(): T | void;
  peek(): T | void;
  size(): number;
}

export class Stack<T> implements IStack<T> {
  private storage: Array<T> = [];
  constructor(private capacity: number = 1000) {}

  /**
   *
   * @param item item to push onto the top of the stack first item in is the last to come off LIFO
   */
  public push(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Stack has reached max capacity, can't add more items");
    }
    this.storage.push(item);
  }

  /**
   *
   * @returns returns the item on the top of the stack and removes it from the stack
   */
  public pop(): T | void {
    return this.storage.pop();
  }

  /**
   *
   * @returns returns the item on the top of the stack but doesn't remove the item
   */
  public peek(): T | void {
    return this.storage[this.size() - 1];
  }

  /**
   *
   * @returns number as the size of the stack storage array
   */
  public size(): number {
    return this.storage.length;
  }
}

let example = "{([(<{}[<>[]}>{[]{[(<()>";

const stack = new Stack<string>();
const matching = { "(": ")", "[": "]", "{": "}", "<": ">" } as Record<string, string>;

export interface ICheckChunkResult {
  corrupt?: boolean;
  incomplete?: boolean;
}

export function checkChunk(chunk: string): ICheckChunkResult {
  let result = { corrupt: void 0, incomplete: void 0 } as ICheckChunkResult;
  for (let i = 0; i < chunk.length; i++) {
    if (chunk[i] === "(" || chunk[i] === "[" || chunk[i] === "{" || chunk[i] === "<") {
      stack.push(chunk[i]);
      // console.log("pushing opening char", stack.peek());
    }
    if (chunk[i] === ")" || chunk[i] === "]" || chunk[i] === "}" || chunk[i] === ">") {
      console.log("closing chunk char", chunk[i]);
      //check if current top of stack is matching this closing character
      if (matching[stack.peek() as string] === chunk[i]) {
        // console.log("top of stack matched a closing char, pop");
        stack.pop();
      } else {
        // console.log("top of stack did not match a closing char, is corrupt");
        result.corrupt = true;
      }
    }
  }
  return result;
}
const result = checkChunk(example);

console.log("result", result);

// console.log("stack size", stack.size());
// let currentSize = stack.size();
// for (let j = 0; j < currentSize; j++) {
//   console.log("j", j, "pop", stack.pop(), "size", stack.size());
// }
