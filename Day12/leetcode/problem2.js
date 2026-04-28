//Merge k Sorted Lists
var mergeKLists = function (lists) {
    const heap = new MinHeap();

    // Step 1: push first node of each list
    for (let node of lists) {
        if (node) heap.push(node);
    }

    let dummy = new ListNode(0);
    let curr = dummy;

    // Step 2: process heap
    while (heap.size() > 0) {
        let smallest = heap.pop();

        curr.next = smallest;
        curr = curr.next;

        if (smallest.next) {
            heap.push(smallest.next);
        }
    }

    return dummy.next;
};