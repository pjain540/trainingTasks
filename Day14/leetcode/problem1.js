function largestRectangleArea(heights) {
    let stack = []; // stores indices
    let maxArea = 0;

    // Add a dummy bar (0 height) to flush stack at the end
    heights.push(0);

    for (let i = 0; i < heights.length; i++) {
        // If current height is smaller, calculate area
        while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
            let height = heights[stack.pop()];
            let width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }

    return maxArea;
}