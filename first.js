// 1. Функція, яка приймає строку і друкує її в зворотньому порядку
function reverseString(str) {
    if (str === "") return "";
    return reverseString(str.slice(1)) + str[0];
}

// Приклад використання
console.log(reverseString("tiger")); // "regit"

// 2. Функція для зміни місцями кожних двох сусідніх вузлів у зв'язаному списку
function swapPairs(head) {
    if (!head || !head.next) return head;
    let firstNode = head;
    let secondNode = head.next;

    firstNode.next = swapPairs(secondNode.next);
    secondNode.next = firstNode;

    return secondNode;
}

// Приклад використання
// let head = { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: null } } } };
// console.log(swapPairs(head)); // {val: 2, next: {val: 1, next: {val: 4, next: {val: 3, next: null}}}}

// 3. Функція для обчислення числа Фібоначчі
function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Приклад використання
console.log(fibonacci(4)); // 3

// 4. Функція для обчислення унікальних способів піднятися по сходах
function climbStairs(n) {
    if (n <= 1) return 1;
    return climbStairs(n - 1) + climbStairs(n - 2);
}

// Приклад використання
console.log(climbStairs(3)); // 3

// 5. Функція піднесення числа x у ступінь n
function pow(x, n) {
    if (n === 0) return 1;
    if (n < 0) return 1 / pow(x, -n);
    return x * pow(x, n - 1);
}

// Приклад використання
console.log(pow(2.0, 10)); // 1024.00000
console.log(pow(2.1, 3)); // 9.26100
console.log(pow(2.0, -2)); // 0.25000
