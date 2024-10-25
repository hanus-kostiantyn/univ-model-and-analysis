// 1. Валідні дужки
function isValid(s) {
    const stack = [];
    const map = { ")": "(", "}": "{", "]": "[" };

    for (let char of s) {
        if (char in map) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}

// 2. Обхід бінарного дерева в порядку (Inorder Traversal)
function inorderTraversal(root) {
    if (!root) return [];
    return [
        ...inorderTraversal(root.left),
        root.val,
        ...inorderTraversal(root.right),
    ];
}

// 3. Мінімальний стек
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(val) {
        this.stack.push(val);
        if (this.minStack.length === 0 || val <= this.getMin()) {
            this.minStack.push(val);
        }
    }

    pop() {
        if (this.stack.pop() === this.getMin()) {
            this.minStack.pop();
        }
    }

    top() {
        return this.stack[this.stack.length - 1];
    }

    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

// 4. Реалізуйте чергу використовуючи стеки
class MyQueue {
    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }

    push(x) {
        this.stack1.push(x);
    }

    pop() {
        if (this.stack2.length === 0) {
            while (this.stack1.length) {
                this.stack2.push(this.stack1.pop());
            }
        }
        return this.stack2.pop();
    }

    peek() {
        if (this.stack2.length === 0) {
            while (this.stack1.length) {
                this.stack2.push(this.stack1.pop());
            }
        }
        return this.stack2[this.stack2.length - 1];
    }

    empty() {
        return this.stack1.length === 0 && this.stack2.length === 0;
    }
}

// 5. Декодувати рядок
function decodeString(s) {
    const stack = [];
    for (let char of s) {
        if (char !== "]") {
            stack.push(char);
        } else {
            let encodedStr = "";
            while (stack[stack.length - 1] !== "[") {
                encodedStr = stack.pop() + encodedStr;
            }
            stack.pop();

            let k = "";
            while (stack.length && !isNaN(stack[stack.length - 1])) {
                k = stack.pop() + k;
            }
            stack.push(encodedStr.repeat(Number(k)));
        }
    }
    return stack.join("");
}

// 6. Оцініть зворотну польську нотацію
function evalRPN(tokens) {
    const stack = [];

    for (let token of tokens) {
        if (["+", "-", "*", "/"].includes(token)) {
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
                case "+":
                    stack.push(a + b);
                    break;
                case "-":
                    stack.push(a - b);
                    break;
                case "*":
                    stack.push(a * b);
                    break;
                case "/":
                    stack.push(Math.trunc(a / b));
                    break;
            }
        } else {
            stack.push(Number(token));
        }
    }
    return stack[0];
}

// 7. Найдовші дійсні дужки
function longestValidParentheses(s) {
    let maxLen = 0;
    const stack = [-1];

    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length === 0) {
                stack.push(i);
            } else {
                maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
            }
        }
    }
    return maxLen;
}
