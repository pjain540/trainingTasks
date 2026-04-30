function maxSlidingWindow(nums, k) {
    let deque = []; // stores indices
    let result = [];

    for (let i = 0; i < nums.length; i++) {

        // Remove elements out of window
        if (deque.length && deque[0] <= i - k) {
            deque.shift();
        }

        // Remove smaller elements from back
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }

        // Add current index
        deque.push(i);

        // Window is ready
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
}