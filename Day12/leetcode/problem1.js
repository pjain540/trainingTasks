//Find Median from Data Stream
var MedianFinder = function () {
    this.left = [];   // max heap (descending)
    this.right = [];  // min heap (ascending)
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
    // Step 1: add to left
    this.left.push(num);
    this.left.sort((a, b) => b - a);

    // Step 2: move largest from left → right
    this.right.push(this.left.shift());
    this.right.sort((a, b) => a - b);

    // Step 3: balance sizes
    if (this.right.length > this.left.length) {
        this.left.push(this.right.shift());
        this.left.sort((a, b) => b - a);
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
    if (this.left.length > this.right.length) {
        return this.left[0];
    }
    return (this.left[0] + this.right[0]) / 2;
};