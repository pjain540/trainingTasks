//https://leetcode.com/problems/longest-palindromic-substring/
var longestPalindrome = function(s) {
    let longest = ""
    for(let i = 0; i < s.length; i++){
        let sum = s[i]
        for(let j = i+1; j < s.length; j++){
            sum = sum + s[j]
            if((sum == sum.split('').reverse().join('')) && (sum.length > longest.length)){
                longest = sum
            }
        }
        
    }
    return longest
};