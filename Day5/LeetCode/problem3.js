//https://leetcode.com/problems/reverse-integer/
var reverse = function(x) {
    let result = 0;
    while(x != 0){
        let digit = x % 10;
        result = result*10 + digit
        x = Math.trunc(x / 10)

        if (result < -2147483648 || result > 2147483647) {
            return 0;
        }
        
    }
    return result
};