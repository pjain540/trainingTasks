//https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/
var searchRange = function(nums, target) {
    let first = -1, last = -1;
    for (let i = 0; i < nums.length; i++){
        if(nums[i] === target){
            if(first === -1) first = i
        last = i
        }
    }
    return [first,last]
};