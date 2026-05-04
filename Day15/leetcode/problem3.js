/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
    nums = [1, ...nums, 1]
    const n = nums.length
    const dp = Array.from({ length: n }, () => Array(n).fill(0))
    for (let len = 1; len <= n - 2; len++) {
        for (let i = 1; i <= n - len - 1; i++) {
            let j = i + len - 1
            for (let k = i; k <= j; k++) {
                dp[i][j] = Math.max(
                    dp[i][j],
                    dp[i][k - 1] +
                    nums[i - 1] * nums[k] * nums[j + 1] +
                    dp[k + 1][j]
                );
            }
        }
    }
    return dp[1][n - 2];
};

//url: https://leetcode.com/problems/burst-balloons/submissions/1994860866/