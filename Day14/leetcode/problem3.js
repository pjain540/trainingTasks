function sumSubarrayMins(arr) {
    const MOD = 1e9 + 7;
    let n = arr.length;

    let stack = [];
    let left = new Array(n);
    let right = new Array(n);

    // Previous Less Element (strictly less)
    for (let i = 0; i < n; i++) {
        while (stack.length && arr[stack[stack.length - 1]] > arr[i]) {
            stack.pop();
        }
        left[i] = stack.length === 0 ? i + 1 : i - stack[stack.length - 1];
        stack.push(i);
    }

    stack = [];

    // Next Less Element (less or equal)
    for (let i = n - 1; i >= 0; i--) {
        while (stack.length && arr[stack[stack.length - 1]] >= arr[i]) {
            stack.pop();
        }
        right[i] = stack.length === 0 ? n - i : stack[stack.length - 1] - i;
        stack.push(i);
    }

    let result = 0;

    for (let i = 0; i < n; i++) {
        result = (result + arr[i] * left[i] * right[i]) % MOD;
    }

    return result;
}