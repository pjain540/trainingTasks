function addOperators(num, target) {
    const result = [];

    function backtrack(index, path, value, prev) {
        // If we used all digits
        if (index === num.length) {
            if (value === target) {
                result.push(path);
            }
            return;
        }

        for (let i = index; i < num.length; i++) {
            // جلوگیری leading zero
            if (i !== index && num[index] === '0') break;

            let currStr = num.substring(index, i + 1);
            let curr = Number(currStr);

            // First number (no operator)
            if (index === 0) {
                backtrack(i + 1, currStr, curr, curr);
            } else {
                // +
                backtrack(i + 1, path + "+" + currStr, value + curr, curr);

                // -
                backtrack(i + 1, path + "-" + currStr, value - curr, -curr);

                // *
                backtrack(
                    i + 1,
                    path + "*" + currStr,
                    value - prev + prev * curr, // fix precedence
                    prev * curr
                );
            }
        }
    }

    backtrack(0, "", 0, 0);
    return result;
}