// 1. Максимальна кількість повторень 1-ці в масиві
function maxConsecutiveOnes(nums) {
    function helper(index, count, maxCount) {
        if (index >= nums.length) return maxCount;
        if (nums[index] === 1) count++;
        else count = 0;
        return helper(index + 1, count, Math.max(maxCount, count));
    }
    return helper(0, 0, 0);
}

// 2. Знайдіть числа з парною кількістю цифр
function findNumbers(nums) {
    function countDigits(num) {
        return num === 0 ? 0 : 1 + countDigits(Math.floor(num / 10));
    }

    function helper(index, count) {
        if (index >= nums.length) return count;
        if (countDigits(nums[index]) % 2 === 0) count++;
        return helper(index + 1, count);
    }
    return helper(0, 0);
}

// 3. Квадрати відсортованого масиву
function sortedSquares(nums) {
    function helper(index, result) {
        if (index >= nums.length) return result.sort((a, b) => a - b);
        result.push(nums[index] ** 2);
        return helper(index + 1, result);
    }
    return helper(0, []);
}

// 4. Подвійні нулі
function duplicateZeros(arr) {
    function helper(index) {
        if (index >= arr.length - 1) return;
        if (arr[index] === 0) arr.splice(index, 0, 0) && arr.pop();
        helper(index + 1);
    }
    helper(0);
    return arr;
}

// 5. Об’єднати відсортований масив
function merge(nums1, m, nums2, n) {
    function helper(index) {
        if (n === 0) return;
        nums1[m + index] = nums2[index];
        helper(index + 1);
    }
    helper(0);
    nums1.sort((a, b) => a - b);
}

// 6. Видалити дублікати з відсортованого масиву
function removeDuplicates(nums) {
    function helper(index, k) {
        if (index >= nums.length) return k;
        if (index === 0 || nums[index] !== nums[index - 1])
            nums[k++] = nums[index];
        return helper(index + 1, k);
    }
    return helper(0, 0);
}

// 7. Перевірте, чи існують N і його подвійник
function checkIfExist(arr) {
    function helper(index) {
        if (index >= arr.length) return false;
        if (
            arr.includes(arr[index] * 2) &&
            arr.indexOf(arr[index] * 2) !== index
        )
            return true;
        return helper(index + 1);
    }
    return helper(0);
}

// 8. Дійсний гірський масив
function validMountainArray(arr) {
    function helper(index, peakReached) {
        if (index === arr.length - 1) return peakReached;
        if (arr[index] === arr[index + 1]) return false;
        if (arr[index] > arr[index + 1])
            return peakReached ? helper(index + 1, true) : false;
        return helper(index + 1, true);
    }
    return arr.length >= 3 && helper(0, false);
}

// 9. Замініть елементи на найбільший елемент з правого боку
function replaceElements(arr) {
    function helper(index, max) {
        if (index < 0) return arr;
        const current = arr[index];
        arr[index] = max;
        return helper(index - 1, Math.max(current, max));
    }
    return helper(arr.length - 1, -1);
}

// 10. Відсортувати масив за парністю
function sortArrayByParity(nums) {
    function helper(index, even, odd) {
        if (index === nums.length) return even.concat(odd);
        if (nums[index] % 2 === 0) even.push(nums[index]);
        else odd.push(nums[index]);
        return helper(index + 1, even, odd);
    }
    return helper(0, [], []);
}
