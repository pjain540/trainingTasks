var strangePrinter = function (s) {
    const n = s.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    // Base case
    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }

    // Process substrings by length
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1;

            dp[i][j] = dp[i + 1][j] + 1;

            for (let k = i + 1; k <= j; k++) {
                if (s[i] === s[k]) {
                    let val = dp[i][k - 1];
                    if (k + 1 <= j) val += dp[k + 1][j];

                    dp[i][j] = Math.min(dp[i][j], val);
                }
            }
        }
    }

    return dp[0][n - 1];
};

//url: https://leetcode.com/problems/strange-printer/submissions/1994842906/