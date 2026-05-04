/**
 * @param {number[][]} graph
 * @return {number}
 */
var shortestPathLength = function (graph) {
    const n = graph.length;
    const targetMask = (1 << n) - 1;

    let queue = []
    let visited = new Set()

    //start from every node
    for (let i = 0; i < n; i++) {
        let mask = (1 << i)
        queue.push([i, mask]);
        visited.add(`${i}-${mask}`);
    }

    let steps = 0;

    while (queue.length > 0) {
        let size = queue.length

        for (let i = 0; i < size; i++) {
            let [node, mask] = queue.shift();
            if (mask === targetMask) return steps;
            for (let neighbor of graph[node]) {
                let newMask = mask | (1 << neighbor);
                let state = `${neighbor}-${newMask}`;

                if (!visited.has(state)) {
                    visited.add(state);
                    queue.push([neighbor, newMask]);
                }
            }
        }
        steps++
    }
    return -1
};

// url: https://leetcode.com/problems/shortest-path-visiting-all-nodes/submissions/1994789405/