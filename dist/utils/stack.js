"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkChunk = exports.Stack = void 0;
class Stack {
    constructor(capacity = 1000) {
        this.capacity = capacity;
        this.storage = [];
    }
    push(item) {
        if (this.size() === this.capacity) {
            throw Error("Stack has reached max capacity, can't add more items");
        }
        this.storage.push(item);
    }
    pop() {
        return this.storage.pop();
    }
    peek() {
        return this.storage[this.size() - 1];
    }
    size() {
        return this.storage.length;
    }
}
exports.Stack = Stack;
let example = "{([(<{}[<>[]}>{[]{[(<()>";
const stack = new Stack();
const matching = { "(": ")", "[": "]", "{": "}", "<": ">" };
function checkChunk(chunk) {
    let result = { corrupt: void 0, incomplete: void 0 };
    for (let i = 0; i < chunk.length; i++) {
        if (chunk[i] === "(" || chunk[i] === "[" || chunk[i] === "{" || chunk[i] === "<") {
            stack.push(chunk[i]);
        }
        if (chunk[i] === ")" || chunk[i] === "]" || chunk[i] === "}" || chunk[i] === ">") {
            if (matching[stack.peek()] === chunk[i]) {
                stack.pop();
            }
            else {
                result.corrupt = true;
            }
        }
    }
    return result;
}
exports.checkChunk = checkChunk;
const result = checkChunk(example);
console.log("result", result);
//# sourceMappingURL=stack.js.map