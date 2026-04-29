/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var hasMatch = function (s, p) {
    let [left, right] = p.split("*")
    for (let i = 0; i <= s.length - left.length; i++) {
        if (s.substring(i, i + left.lenght) == left) {
            let remaining = s.substring(i + left.length)
            if (remaining.includes(right)) {
                return true
            }
        }
    }
    return false
};