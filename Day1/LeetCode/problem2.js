//https://leetcode.com/problems/subarray-sum-equals-k/description/
//Subarrays sum equals to k

const arr = [1,1,1]
const k = 2
let count = 0
for (let i = 0; i < arr.length; i++){
    let sum = 0
    for (let j = i; j < arr.length; j++){
        sum += arr[j]
        if(sum==k){
            count += 1
        }
    }
}
console.log(count)

//output
//2