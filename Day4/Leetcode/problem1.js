//https://leetcode.com/problems/longest-substring-without-repeating-characters/submissions/1960884227/

let str = "abcabcbb"
let result = []

for(let i = 0; i<str.length; i++){
    let sumstr = ""
    for(let j = i; j<str.length; j++){
        if(!sumstr.includes(str[j])){
            sumstr+=str[j]
        }
    }
    result.push(sumstr)
}

let max = Math.max(...result.map(s => s.length));
console.log("Max Length:", max);