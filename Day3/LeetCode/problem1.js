//1. Binary Tree Level Order Traversal
//this is based on breadth first search(BFS)
//level by level search
//Use in react: parent component render child component level by level


var levelOrder = function (root) {
    if (!root) return
    const result = [];
    const queue = [root]

    while (queue.length) {
        let size = queue.length
        let level = []

        for (let i = 0; i < size; i++) {
            let node = queue.shift()
            level.push(node.val)

            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
        result.push(level)
    }
    return result
}