// 1. Об’єднати два відсортовані списки
function mergeTwoLists(list1, list2) {
    if (!list1) return list2;
    if (!list2) return list1;

    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
}

// 2. Видалити дублікати з відсортованого списку
function deleteDuplicates(head) {
    if (!head || !head.next) return head;

    if (head.val === head.next.val) {
        head.next = head.next.next;
        deleteDuplicates(head);
    } else {
        deleteDuplicates(head.next);
    }
    return head;
}

// 3. Цикл пов’язаного списку
function hasCycle(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}

// 4. Перевпорядкувати список
function reorderList(head) {
    const arr = [];
    let current = head;

    while (current) {
        arr.push(current);
        current = current.next;
    }

    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        arr[left].next = arr[right];
        left++;
        if (left === right) break;
        arr[right].next = arr[left];
        right--;
    }
    arr[left].next = null;
}

// 5. Видалити вузол у зв’язаному списку
function deleteNode(node) {
    node.val = node.next.val;
    node.next = node.next.next;
}

// 6. Подвоїти число, представлене у вигляді зв’язаного списку
function doubleLinkedList(head) {
    function doubleHelper(node) {
        if (!node) return 0;
        let carry = doubleHelper(node.next);
        let value = node.val * 2 + carry;
        node.val = value % 10;
        return Math.floor(value / 10);
    }

    let carry = doubleHelper(head);
    if (carry > 0) {
        let newHead = new ListNode(carry);
        newHead.next = head;
        head = newHead;
    }
    return head;
}

// 7. Об’єднати k відсортованих списків
function mergeKLists(lists) {
    if (lists.length === 0) return null;
    while (lists.length > 1) {
        let list1 = lists.shift();
        let list2 = lists.shift();
        const mergedList = mergeTwoLists(list1, list2);
        lists.push(mergedList);
    }
    return lists[0];
}

// 8. Розвернути вузли в k-групі
function reverseKGroup(head, k) {
    let count = 0;
    let node = head;
    while (node && count < k) {
        node = node.next;
        count++;
    }

    if (count === k) {
        let reversedHead = reverse(head, k);
        head.next = reverseKGroup(node, k);
        return reversedHead;
    }
    return head;
}

function reverse(head, k) {
    let prev = null;
    let current = head;
    while (k > 0) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
        k--;
    }
    return prev;
}

// 9. Розділити список
function partition(head, x) {
    let beforeHead = new ListNode(0);
    let afterHead = new ListNode(0);
    let before = beforeHead;
    let after = afterHead;

    while (head) {
        if (head.val < x) {
            before.next = head;
            before = before.next;
        } else {
            after.next = head;
            after = after.next;
        }
        head = head.next;
    }
    after.next = null;
    before.next = afterHead.next;
    return beforeHead.next;
}

// 10. Замініть елементи на найбільший елемент з правого боку
function replaceElements(arr) {
    let maxRight = -1;
    for (let i = arr.length - 1; i >= 0; i--) {
        let newMax = Math.max(maxRight, arr[i]);
        arr[i] = maxRight;
        maxRight = newMax;
    }
    return arr;
}
