var isAlienSorted = function (words, order) {
    // Step 1: create order map
    const map = {};
    for (let i = 0; i < order.length; i++) {
        map[order[i]] = i;
    }

    // Step 2: compare words
    for (let i = 0; i < words.length - 1; i++) {
        let w1 = words[i];
        let w2 = words[i + 1];

        if (!isValid(w1, w2, map)) {
            return false;
        }
    }

    return true;
};

// helper function
function isValid(w1, w2, map) {
    let len = Math.min(w1.length, w2.length);

    for (let i = 0; i < len; i++) {
        if (w1[i] !== w2[i]) {
            return map[w1[i]] < map[w2[i]];
        }
    }

    // prefix case
    return w1.length <= w2.length;
}

//url: https://leetcode.com/problems/verifying-an-alien-dictionary/submissions/1994863259/