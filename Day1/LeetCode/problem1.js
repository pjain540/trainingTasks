//https://leetcode.com/problems/product-of-array-except-self/
//Product of array except self

const arr = [1,2,3,4]
const result = []
for(let i = 0; i < arr.length; i++){
    let product = 1;
    for(let j = 0; j<arr.length; j++){
        if(i != j){
            product *= arr[j]
        }
    }
    result.push(product)
}
console.log(arr)
console.log(result)

//output
//[1,2,3,4]
//[24,12,8,6]