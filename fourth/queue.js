// 1. Перший унікальний символ у рядку
function firstUniqChar(s) {
    const charCount = {};
    for (let char of s) charCount[char] = (charCount[char] || 0) + 1;

    for (let i = 0; i < s.length; i++) {
        if (charCount[s[i]] === 1) return i;
    }
    return -1;
}

// 2. Реалізація стека за допомогою черг
class MyStack {
    constructor() {
        this.queue1 = [];
        this.queue2 = [];
    }

    push(x) {
        this.queue2.push(x);
        while (this.queue1.length) this.queue2.push(this.queue1.shift());
        [this.queue1, this.queue2] = [this.queue2, this.queue1];
    }

    pop() {
        return this.queue1.shift();
    }

    top() {
        return this.queue1[0];
    }

    empty() {
        return this.queue1.length === 0;
    }
}

// 3. Кількість останніх викликів
class RecentCounter {
    constructor() {
        this.requests = [];
    }

    ping(t) {
        this.requests.push(t);
        while (this.requests[0] < t - 3000) this.requests.shift();
        return this.requests.length;
    }
}

// 4. Дизайн замкнутої двубічної черги (Deque)
class MyCircularDeque {
    constructor(k) {
        this.queue = new Array(k).fill(null);
        this.head = -1;
        this.tail = -1;
        this.size = k;
    }

    insertFront(value) {
        if (this.isFull()) return false;
        if (this.isEmpty()) this.head = this.tail = 0;
        else this.head = (this.head - 1 + this.size) % this.size;
        this.queue[this.head] = value;
        return true;
    }

    insertLast(value) {
        if (this.isFull()) return false;
        if (this.isEmpty()) this.head = this.tail = 0;
        else this.tail = (this.tail + 1) % this.size;
        this.queue[this.tail] = value;
        return true;
    }

    deleteFront() {
        if (this.isEmpty()) return false;
        if (this.head === this.tail) this.head = this.tail = -1;
        else this.head = (this.head + 1) % this.size;
        return true;
    }

    deleteLast() {
        if (this.isEmpty()) return false;
        if (this.head === this.tail) this.head = this.tail = -1;
        else this.tail = (this.tail - 1 + this.size) % this.size;
        return true;
    }

    getFront() {
        return this.isEmpty() ? -1 : this.queue[this.head];
    }

    getRear() {
        return this.isEmpty() ? -1 : this.queue[this.tail];
    }

    isEmpty() {
        return this.head === -1;
    }

    isFull() {
        return (this.tail + 1) % this.size === this.head;
    }
}

// 5. Штампування послідовності
function movesToStamp(stamp, target) {
    const res = [];
    const targetArr = [...target];
    const stampLen = stamp.length;
    const maxTurns = 10 * target.length;

    const canStamp = (index) => {
        for (let i = 0; i < stampLen; i++) {
            if (
                targetArr[index + i] !== "?" &&
                targetArr[index + i] !== stamp[i]
            )
                return false;
        }
        return true;
    };

    const doStamp = (index) => {
        for (let i = 0; i < stampLen; i++) {
            targetArr[index + i] = "?";
        }
    };

    let stamped = true;
    while (stamped && res.length <= maxTurns) {
        stamped = false;
        for (let i = 0; i <= targetArr.length - stampLen; i++) {
            if (canStamp(i)) {
                doStamp(i);
                res.push(i);
                stamped = true;
            }
        }
    }
    return targetArr.every((c) => c === "?") ? res.reverse() : [];
}

// 6. Максимум плаваючого вікна
function maxSlidingWindow(nums, k) {
    const deque = [];
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        if (deque[0] < i - k + 1) deque.shift();
        while (deque.length && nums[deque[deque.length - 1]] < nums[i])
            deque.pop();
        deque.push(i);
        if (i >= k - 1) result.push(nums[deque[0]]);
    }
    return result;
}

// 7. Обмежена сума підпослідовності
function constrainedSubsetSum(nums, k) {
    const deque = [];
    let maxSum = -Infinity;

    for (let i = 0; i < nums.length; i++) {
        nums[i] += deque.length ? nums[deque[0]] : 0;
        maxSum = Math.max(maxSum, nums[i]);

        while (deque.length && nums[deque[deque.length - 1]] <= nums[i])
            deque.pop();
        deque.push(i);

        if (deque[0] === i - k) deque.shift();
    }
    return maxSum;
}
